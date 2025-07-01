import { WebSocketServer ,WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let peer:WebSocket[]=[]

wss.on("connection", (ws) => {
  peer.push(ws);
  ws.on("message", (msg) => {

    const message = JSON.parse(msg.toString());

    let target= peer.filter(p => p !==ws)
    if(target.length==0) return ;
    if(["createOffer", "createAnswer", "iceCandidate"].includes(message.type)) {
      target.forEach((p)=> {
        p.send(JSON.stringify(message))
      })
    } 
  });

  ws.on("close", () => {
    peer = peer.filter(p => p !== ws);
  });
});

console.log("WebSocket signaling server running on ws://localhost:8080");