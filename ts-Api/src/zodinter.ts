import {z} from 'zod'
import express from 'express'

const app=express()
const ZodSchema = z.object({
   name: z.string().min(1, { message: 'Invalid name: must be at least 1 character long' }),
   email:z.string().email({message:'not valid string'})
 });

 type zodType=z.infer<typeof ZodSchema>//extracting type from zod

app.put('/',(req,res)=> {
   const {success}=ZodSchema.safeParse(req.body)


   const userdata:zodType =req.body
   if(success){
      // do db.call
   }
})