import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// Only support 2 peers at a time
let peers: WebSocket[] = [];

wss.on("connection", (ws) => {
  if (peers.length >= 2) {
    ws.send(JSON.stringify({ type: "error", message: "Room full" }));
    ws.close();
    return;
  }

  peers.push(ws);
  console.log("New peer connected");

  ws.on("message", (msg) => {
    const data = JSON.parse(msg.toString());

    const other = peers.find((p) => p !== ws);
    if (other && other.readyState === WebSocket.OPEN) {
      other.send(JSON.stringify(data));
    }
  });

  ws.on("close", () => {
    peers = peers.filter((p) => p !== ws);
    console.log("Peer disconnected");
  });
});

console.log("Signaling server running at ws://localhost:8080");
