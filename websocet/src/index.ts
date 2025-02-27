import express from 'express'
import { WebSocketServer,WebSocket } from 'ws'

const app = express()
const httpServer = app.listen(8080,()=> {
  console.log('Server Started in port 8080')
})

const wss = new WebSocketServer({ server: httpServer });

let count=0;

wss.on('connection', (socket) => {
  socket.on('error', console.error);
  console.log('Client Connected'+ ++count);

  socket.on('message', (data,isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, {binary: isBinary});
      }
    });
  });

  socket.send('Hello! Message From Server!!');
});
