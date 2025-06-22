import { useEffect, useRef, useState } from "react";

export const Sender = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pc, setPC] = useState<RTCPeerConnection | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "sender" }));
    };
    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (!pc) return;
      if (message.type === "createAnswer") {
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
      } else if (message.type === "iceCandidate") {
        await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    };
    setSocket(ws);
  }, []);

  const startConnection = async () => {
    if (!socket) return;

    const localPC = new RTCPeerConnection();
    setPC(localPC);

    localPC.onicecandidate = (event) => {
      if (event.candidate) {
        socket.send(JSON.stringify({
          type: "iceCandidate",
          candidate: event.candidate
        }));
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => localPC.addTrack(track, stream));
    
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    socket.send(JSON.stringify({
      type: "createOffer",
      sdp: localPC.localDescription
    }));
  };

  return (
    <div>
      <h2>Sender</h2>
      <video ref={videoRef} autoPlay muted playsInline width={400} />
      <br />
      <button onClick={startConnection}>Start Streaming</button>
    </div>
  );
};
