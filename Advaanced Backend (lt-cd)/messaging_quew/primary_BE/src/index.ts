import express from 'express';
import { createClient } from 'redis';

const app=express();
const port=3000;

app.use(express.json());

const client=createClient();

app.post('/submit', async(req,res)=> {
   try{
      const {problem ,userid,language,sol} = req.body;
      //add to the primary bg
      //eg : prisma.submitoions.create({data:{problem,userid,language,sol}})
      await client.lPush('submition',JSON.stringify({problem,userid,language,sol}));
      res.status(200).send('Submition added to the queue');
   }catch(err){
       console.log("error while ading to quew"+err);
   }
})

const connect =async ()=> {
   try{
      await client.connect();
      console.log('Redis connected');
   
      app.listen(port,()=>{
          console.log('Server running on port 3000');
      });
   }catch(err){
       console.log(err);
   }
}

connect();