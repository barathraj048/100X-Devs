import { WebSocketServer ,WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: WebSocket | null = null;
let receiverSocket: WebSocket | null = null;

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const message = JSON.parse(msg.toString());

    if (message.type === "sender") {
      senderSocket = ws;
    } else if (message.type === "receiver") {
      receiverSocket = ws;
    } else if (message.type === "createOffer") {
      receiverSocket?.send(JSON.stringify({ type: "createOffer", sdp: message.sdp }));
    } else if (message.type === "createAnswer") {
      senderSocket?.send(JSON.stringify({ type: "createAnswer", sdp: message.sdp }));
    } else if (message.type === "iceCandidate") {
      if (ws === senderSocket) {
        receiverSocket?.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
      } else if (ws === receiverSocket) {
        senderSocket?.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
      }
    }
  });

  ws.on("close", () => {
    if (ws === senderSocket) senderSocket = null;
    if (ws === receiverSocket) receiverSocket = null;
  });
});

console.log("WebSocket signaling server running on ws://localhost:8080");
