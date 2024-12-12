import { NextRequest, NextResponse } from "next/server";

export  function GET() {
   return (
      NextResponse.json({
         name:"barath",
         email:"barath@gmail.com"
      })
   )
}

export async function POST(req:NextRequest){
   const body= await req.body
   console.log(body)
   const head=req.headers.get('auth')
   console.log(head)
   const prams=req.nextUrl.searchParams.get('name')
   console.log(prams)
   return (NextResponse.json({
      message: "you logged in"
    }))
    
}