import { useEffect, useRef, useState } from "react";

const Peer = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    console.log("🔌 Connecting WebSocket...");
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log(" WebSocket connected (receiver)");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error (receiver):", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed (receiver)");
    };

    setSocket(ws);

    // Create RTCPeerConnection
    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    // ICE candidate gathering
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("Sending ICE candidate (receiver)");
        ws.send(JSON.stringify({ type: "iceCandidate", candidate: e.candidate }));
      } else {
        console.log("ICE gathering complete (receiver)");
      }
    };

    // ICE state updates
    pc.oniceconnectionstatechange = () => {
      console.log("ICE connection state (receiver):", pc.iceConnectionState);
    };

    // Handle remote track
    pc.ontrack = (event) => {
      console.log("Remote track received (receiver)");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Handle incoming WebSocket messages
    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log(" Received message:", data);

      if (data.type === "offer") {
        console.log("Received offer (receiver)");
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.send(JSON.stringify({ type: "answer", sdp: answer }));
        console.log("Sent answer (receiver)");
      } else if (data.type === "answer") {
        console.log(" Received unexpected answer on receiver side");
      } else if (data.type === "iceCandidate") {
        try {
          console.log(" Adding ICE candidate (receiver)");
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          console.error(" Error adding ICE candidate (receiver)", err);
        }
      }
    };

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      console.log("🎥 Got local media (receiver)");
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    }).catch((err) => {
      console.error(" Failed to get local media (receiver):", err);
    });
  }, []);

  return (
    <div>
      <h2>Receiver</h2>
      <h4>Local</h4>
      <video ref={localVideoRef} autoPlay playsInline muted />
      <h4>Remote</h4>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default Peer;
