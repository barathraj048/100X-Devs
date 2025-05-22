"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var wss = new ws_1.WebSocketServer({ port: 8081 });
wss.on('connection', function (ws) {
    console.log('Client connected');
    ws.on('message', function (message) {
        console.log('Received:', message.toString());
        ws.send('Hello from server');
    });
    ws.on('close', function () {
        console.log('Client disconnected');
    });
});
