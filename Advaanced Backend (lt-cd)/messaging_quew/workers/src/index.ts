import { createClient } from "redis";

const client = createClient();

const connect = async () => {
   try {
      await client.connect();
      console.log("Redis connected");
   } catch (err) {
      console.error("Redis connection error:", err);
   }
};

connect();

const processSubmissions = async () => {
   try {
      while (true) {
         const response: any = await client.rPop("submition");
         if (response) {
            console.log("submition response:", response);
            submition(response);
         }
         await new Promise((res) => setTimeout(res, 2000)); 
      }
   } catch (err) {
      console.error("Error processing submissions:", err);
   }
};

processSubmissions();


//submition to pub-sub
let submition=async(resp:any)=> {
   try{
      new Promise((res) => setTimeout(res, 2000));
      const { problem, userid, language, sol } = JSON.parse(resp);
      await client.publish("problem_done",JSON.stringify({problem,Ststus:"done"}));
      console.log('Submition done');
   }catch(err){   
      console.log("Error while submition",err);
   }
}


