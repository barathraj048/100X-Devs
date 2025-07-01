import { useEffect, useRef, useState } from "react";

export const Receiver = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const vdoRef = useRef<HTMLVideoElement>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null)

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);

        const pc = new RTCPeerConnection();
        pcRef.current = pc;

        pc.ontrack = (event) => {
            if (vdoRef.current) {
                vdoRef.current.srcObject = event.streams[0];
                console.log("Setting stream to video", event.streams[0]);

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

        pc.onnegotiationneeded=async()=> {
            const offer= await pc.createOffer()
            await pc.setLocalDescription(offer);

            socket.send(JSON.stringify({
                type: "createOffer",
                sdp: offer
            }))
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (message.type === 'createOffer') {
                await pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                socket.send(JSON.stringify({
                    type: 'createAnswer',
                    sdp: answer
                }));
            } else if (message.type === 'iceCandidate') {
                await pc.addIceCandidate(message.candidate);
            }
        };
    }, []);

    

    return (
        <div>
            <video ref={vdoRef} autoPlay playsInline muted />
        </div>
    );
};
