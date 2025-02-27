"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080, () => {
    console.log('Server Started in port 8080');
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
let count = 0;
wss.on('connection', (socket) => {
    socket.on('error', console.error);
    console.log('Client Connected' + ++count);
    socket.on('message', (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    socket.send('Hello! Message From Server!!');
});
