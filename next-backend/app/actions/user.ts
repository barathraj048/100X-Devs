'use server'
import client from '@/db'

export const Signin=async (username:string,password:string)=> {
   try{
   await client.user.create({
      data: {
         username:username,
         passwors:password
      }
   })
   return true
   }catch(err){
      console.log(err)
      return false
   }
}