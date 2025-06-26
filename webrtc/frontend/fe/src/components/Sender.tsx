import { useEffect, useState } from "react";

export const Sender = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'sender' }));
        };
        setSocket(ws);
    }, []);

    const initiateConn = async () => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            alert("WebSocket is not connected");
            return;
        }

        const pc = new RTCPeerConnection();
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Attach local preview
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        document.body.appendChild(video);

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

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

            if (message.type === 'createAnswer') {
                await pc.setRemoteDescription(message.sdp);
            } else if (message.type === 'iceCandidate') {
                await pc.addIceCandidate(message.candidate);
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
    };

    return <div>
        Sender
        <button onClick={initiateConn}>Send Video</button>
    </div>;
};
