import { useEffect, useRef, useState } from "react";

const Peer = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setSocket(socket);

    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });
      })
      .catch(err => {
        console.error("Failed to get local stream", err);
      });

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        console.log("Remote stream set", event.streams[0]);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.send(JSON.stringify({
          type: 'iceCandidate',
          candidate: event.candidate
        }));
      }
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'createOffer') {
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.send(JSON.stringify({
          type: 'createAnswer',
          sdp: answer
        }));
      } else if (message.type === 'createAnswer') {
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
      } else if (message.type === 'iceCandidate') {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
        } catch (err) {
          console.error("Error adding ICE", err);
        }
      }
    };

    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.send(JSON.stringify({
        type: 'createOffer',
        sdp: offer
      }));
    };

    return () => {
      socket.close();
      pc.close();
    };
  }, []);

  return (
    <div>
      <h2>Local Stream</h2>
      <video ref={localVideoRef} autoPlay playsInline muted />
      <h2>Remote Stream</h2>
      <video ref={remoteVideoRef} autoPlay playsInline muted/>
    </div>
  );
};

export default Peer;
