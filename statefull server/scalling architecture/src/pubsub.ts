import { createClient } from 'redis';

const publisher = createClient({
   socket: {
    host: 'localhost', 
    port: 6379,
  }
});

let connect= async()=> {
   try{
      await publisher.connect();
      console.log('Publisher connected to Redis');
   }catch(err){
      console.error('Error connecting to Redis:', err);
   }
}
connect()
setInterval(async () => {
  const message = `Hello at ${new Date().toISOString()}`;
  await publisher.publish('my-channel', message);
  console.log('Published:', message);
}, 2000);
