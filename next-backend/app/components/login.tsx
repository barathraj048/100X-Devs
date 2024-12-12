'use client'
import { useState } from "react"
import axios from "axios"

export const Login=()=> {
   const [username,setUsernme]=useState('')
   const [password,setPassword]=useState('')
   return(
      <div className="flex h-screen justify-center items-center p-8 ">
         <div className="border-gray-600 ">
            <input type="username" placeholder="username" onChange={(e)=> {setUsernme(e.target.value)}} value={username}/>
            <input type="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}} value={password}/>
            <button onClick={()=> {
               axios.post('http://localhost:3000/api/user',{
                  username,
                  password
               })
            }}>Signup</button>
         </div>
      </div>
   )
}