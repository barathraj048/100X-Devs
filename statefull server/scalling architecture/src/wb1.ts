import { WebSocketServer } from 'ws';
import { createClient } from 'redis';

const wss = new WebSocketServer({ port: 8080 });
const client= createClient({
   url: 'redis://localhost:6379',
})

client.connect()



wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send('Hello from server');
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
