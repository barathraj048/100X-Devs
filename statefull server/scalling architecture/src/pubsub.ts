import { createClient,RedisClientType } from "redis";
export class pubSubManager{
   private static instence: pubSubManager;
   private redisClient:RedisClientType;
   private subscriber:Map<string,string[]>
   constructor(){
      this.redisClient= createClient();
      this,this.redisClient.connect()
      this.subscriber = new Map();
   }
   static getInstance(){
      if(!pubSubManager.instence) {
         pubSubManager.instence = new pubSubManager();
      }
      return pubSubManager.instence;
   }

   subscribe(userid:string,stock:string){
      if(!this.subscriber.has(stock)){
         this.subscriber.set(stock,[])
      }
      this.subscriber.get(stock)?.push(userid)

      if(this.subscriber.get(stock)?.length ==1){
         this.redisClient.subscribe(stock,(msg)=> {
            this.handleMessage(stock,msg);
         })
         console.log(`Subscribed to ${stock} channel`);
      }
   }
   unsubscribe(userid:string,stock:string){
      this.subscriber.set(stock, this.subscriber.get(stock)?.filter((id) => id !== userid) || []);
         if (this.subscriber.get(stock)?.length === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
   }

   handleMessage(stock:string,msg:string){
      console.log(`message reciver for ${stock} is ${msg}`);
      this.subscriber.get(stock)?.forEach(element => {
         console.log(`sending message to users ${element}`)
      });
   }

   public async disconnect(){
      this.redisClient.quit()
      console.log("Redis client disconnected");
   }
}