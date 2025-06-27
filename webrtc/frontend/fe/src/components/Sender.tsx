import { useEffect, useState, useRef } from "react";

export const Sender = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const VdoRef = useRef<HTMLVideoElement>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'sender' }));
        };
        setSocket(ws);

        ws.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (message.type === 'createAnswer') {
                await pcRef.current?.setRemoteDescription(message.sdp);
            } else if (message.type === 'iceCandidate') {
                await pcRef.current?.addIceCandidate(message.candidate);
            }
        };
    }, []);

    const initiateConn = async () => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            alert("WebSocket is not connected");
            return;
        }

        const pc = new RTCPeerConnection();
        pcRef.current = pc;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (VdoRef.current) {
            VdoRef.current.srcObject = stream;
        }

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
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

    return (
        <div>
            <h3>Sender</h3>
            <button onClick={initiateConn}>Send Video</button>
            <video
                ref={VdoRef}
                muted
                autoPlay
                playsInline
            />
        </div>
    );
};
