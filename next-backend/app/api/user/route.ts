import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client=new PrismaClient()

export  function GET() {
   return (
      NextResponse.json({
         name:"barath",
         email:"barath@gmail.com"
      })
   )
}

export async function POST(req:NextRequest){
   try{
      const body= await req.json()
   console.log(body)
   await client.user.create({
      data: {
         username:body.username,
         passwors:body.passwors
      }
   })
   return (NextResponse.json({
      body
    }))
   }catch(err){
      console.log(err)
      NextResponse.json({
         Error:'error handiled',
      },{
         status:402
      })
   }
    
}