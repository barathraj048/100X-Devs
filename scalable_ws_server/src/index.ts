import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let count=0

type Value = {
  ws: WebSocket;
  rooms: string[];
};
let users = new Map<string, Value>();

let generateId=():string=> {
   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  console.log('New client connected'+ (++count));

  let userID:string=generateId()
  if(!users.has(userID)){
    users.set(userID, {ws: ws, rooms: []});
  }
  
   ws.on("message", function message(data) {
      let msg=JSON.parse(data.toString());

      if(msg.type==="subscribe"){
         let user=users.get(userID);
         if(user){
           user.rooms.push(msg.room);
           console.log(`User ${userID} subscribed to room ${msg.room}`);
         }
      }else if(msg.type==="unsubscribe"){
         let user=users.get(userID);
         if(user){
            user.rooms=user.rooms.filter(r => r!==msg.room);
            console.log(`User ${userID} unsubscribed from room ${msg.room}`);
         }
      }
      else if(msg.type==="message"){
         let room=msg.room;
         let content=msg.content;

         users.forEach((value) => {
           if(value.rooms.includes(room) && value.ws !== ws){
             value.ws.send(JSON.stringify({room: room, content: content}));
           }      
      })}
   })


});