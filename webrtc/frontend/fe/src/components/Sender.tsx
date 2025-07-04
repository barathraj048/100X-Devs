import { useEffect, useState, useRef } from "react";

export const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "sender" }));
    };
    setSocket(ws);

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "createAnswer") {
        await pcRef.current?.setRemoteDescription(new RTCSessionDescription(message.sdp));
      } else if (message.type === "iceCandidate") {
        try {
          await pcRef.current?.addIceCandidate(new RTCIceCandidate(message.candidate));
        } catch (e) {
          console.error("ICE add error", e);
        }
      }
    };

    return () => {
      ws.close();
      pcRef.current?.close();
    };
  }, []);

  const initiateConn = async () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not connected");
      return;
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pcRef.current = pc;

    pc.oniceconnectionstatechange = () => {
      console.log("ICE Connection State (Sender):", pc.iceConnectionState);
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        console.log("Remote stream set on sender side");
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.send(JSON.stringify({
          type: "iceCandidate",
          candidate: event.candidate
        }));
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.send(JSON.stringify({
      type: "createOffer",
      sdp: offer
    }));
  };

  return (
    <div>
      <h3>Sender</h3>
      <button onClick={initiateConn}>Send Video</button>
      <h4>Local</h4>
      <video ref={localVideoRef} muted autoPlay playsInline />
      <h4>Remote</h4>
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};
