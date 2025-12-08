import WebSocket, { WebSocketServer } from 'ws';
import { createClient } from 'redis';
const wss = new WebSocketServer({ port: 8081 });
const publishClient = createClient();
await publishClient.connect();
const subscribeClient = createClient();
await subscribeClient.connect();
let count = 0;
let users = new Map();
let generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
let userSubscribed = (room) => {
    for (let val of users.values()) {
        if (val.rooms.includes(room)) {
            return true;
        }
    }
    return false;
};
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    console.log('New client connected' + (++count));
    let userID = generateId();
    if (!users.has(userID)) {
        users.set(userID, { ws: ws, rooms: [] });
    }
    ws.on("message", function message(data) {
        let msg = JSON.parse(data.toString());
        if (msg.type === "subscribe") {
            let user = users.get(userID);
            if (user) {
                user.rooms.push(msg.room);
                console.log(`User ${userID} subscribed to room ${msg.room}`);
                if (!userSubscribed(msg.room)) {
                    subscribeClient.subscribe(msg.room, (message, room) => {
                        users.forEach((val) => {
                            if (val.rooms.includes(room)) {
                                val.ws.send(message);
                            }
                        });
                    });
                }
            }
        }
        else if (msg.type === "unsubscribe") {
            let user = users.get(userID);
            if (user) {
                user.rooms = user.rooms.filter(r => r !== msg.room);
                console.log(`User ${userID} unsubscribed from room ${msg.room}`);
                if (!userSubscribed(msg.room)) {
                    subscribeClient.unsubscribe(msg.room);
                }
            }
        }
        else if (msg.type === "message") {
            let room = msg.room;
            let content = msg.content;
            //    users.forEach((value) => {
            //      if(value.rooms.includes(room) && value.ws !== ws){
            //        value.ws.send(JSON.stringify({room: room, content: content}));
            //      }      
            // }
            // )
            publishClient.publish(room, JSON.stringify({ type: "sendMessage", room: room, content: content }));
        }
    });
});
//# sourceMappingURL=index.js.map