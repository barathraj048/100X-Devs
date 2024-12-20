import express  from "express";
import {congif_uri} from "@repo/common/congig"

console.log(congif_uri)
const app=express()

app.get('/',(req,res)=> {
   res.json({
      'message':"sucess"
   })
})

app.listen(3000,()=>{
 console.log(`express server is running at port 3000`)
})