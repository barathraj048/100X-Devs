import { useEffect, useState, useRef } from "react";

export const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const makingOffer = useRef(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "answer") {
        console.log(" Setting remote description (answer)...");
        await pcRef.current?.setRemoteDescription(new RTCSessionDescription(data.sdp));
      } else if (data.type === "iceCandidate") {
        try {
          console.log(" Adding ICE candidate (sender)...");
          await pcRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          console.error(" Error adding ICE candidate", err);
        }
      }
    };

    setSocket(ws);

    // Create peer connection
    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    // Handle negotiationneeded properly
    pc.onnegotiationneeded = async () => {
      try {
        console.log("⚙️ onnegotiationneeded fired");
        makingOffer.current = true;
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log(" Sending offer from onnegotiationneeded");
        ws.send(JSON.stringify({ type: "offer", sdp: offer }));
      } catch (err) {
        console.error(" Failed during negotiation:", err);
      } finally {
        makingOffer.current = false;
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(" Sending ICE candidate");
        ws.send(JSON.stringify({ type: "iceCandidate", candidate: event.candidate }));
      } else {
        console.log(" ICE candidate gathering done");
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log(" ICE connection state:", pc.iceConnectionState);
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        console.log("📺 Remote stream attached (sender)");
      }
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });
  }, []);

  return (
    <div>
      <h3>Sender</h3>
      <h4>Local</h4>
      <video ref={localVideoRef} autoPlay playsInline muted />
      <h4>Remote</h4>
      <video ref={remoteVideoRef} autoPlay playsInline muted/>
    </div>
  );
};
