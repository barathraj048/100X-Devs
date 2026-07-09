import { Request, Response } from "express";


export const GET = (req:Request,res:Response) => {
   try{
      res.json({
         message:"am working",
         code:200
      })
   }catch(e){
      console.log(`error while fetching${e}`)
   }
}