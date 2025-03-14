import express from "express";
import WebSocket, { WebSocketServer } from 'ws';
import { createClient } from 'redis';

const app = express();
app.use(express.json());
const client = createClient({
   url: "redis://localhost:6379", 
 });

(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");

    const channel = 'problem_done';
    await client.subscribe(channel, (message) => {
      console.log(`Received from Redis channel (${channel}):`, message);

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  } catch (err) {
    console.error("Redis connection error:", err);
  }
})();

const httpSer = app.listen(8080, () => {
  console.log('Server started on port 8080');
});

const wss = new WebSocketServer({ server: httpSer });

wss.on('connection', (socket) => {
  console.log('WebSocket client connected');

  socket.on('error', console.error);

  socket.on('message', (msg) => {
    console.log(`Received from client: ${msg}`);
  });
});
