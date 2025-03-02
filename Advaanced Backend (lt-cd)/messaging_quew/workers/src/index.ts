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
         }
         await new Promise((res) => setTimeout(res, 2000)); 
      }
   } catch (err) {
      console.error("Error processing submissions:", err);
   }
};

processSubmissions();
