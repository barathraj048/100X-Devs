import { useEffect } from "react";

export const Receiver = () => {
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'receiver' }));
        };

        startReceiving(socket);
    }, []);

    function startReceiving(socket: WebSocket) {
        const video = document.createElement('video');
        video.autoplay = true;
        video.playsInline = true;
        document.body.appendChild(video);

        const pc = new RTCPeerConnection();

        const mediaStream = new MediaStream();
        video.srcObject = mediaStream;

        pc.ontrack = (event) => {
            mediaStream.addTrack(event.track);
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
    }

    return <div>Receiver Ready</div>;
};
