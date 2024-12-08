import { PrismaClient } from "@prisma/client";
import { trace } from "console";
 
const prisma =new PrismaClient()

//create users
const insert = async (username:string,passwors:string,firstname?:string,lastname?:string)=> {
   try{
      const val=await prisma.user.create({
         data :{
            username,
            passwors,
            firstname,
            lastname
         }
      })
      console.log(val)
   }catch(err){
      console.log(`error in creating:${err}`)
   }
}

insert('dsfv','aefbffv')