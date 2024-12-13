import client from '@/db'
import { NextRequest, NextResponse } from "next/server";


export const GET= async ()=> {
   const user=await client.user.findFirst()
   return (
      NextResponse.json({
         name:user?.username,
         email:user?.passwors 
      })
   )
}

export const POST= async(req:NextRequest)=> {
   try{
      const body= await req.json()
   console.log(body)
   await client.user.create({
      data: {
         username:body.username,
         passwors:body.password
      }
   })
   return (NextResponse.json({
      body
    }))
   }catch(err){
      NextResponse.json({
         Error:'error handiled',
      },{
         status:402
      })
   }
    
}