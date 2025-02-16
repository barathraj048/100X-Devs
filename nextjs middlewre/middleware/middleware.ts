import { NextRequest, NextResponse } from "next/server";


let count=0
export default (req:NextRequest) => {
   count++;
   console.log(`from middleware count" ${count}`)
   const res=NextResponse.next()
   return res
}