import { Turnstile } from '@marsidev/react-turnstile'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [token,setToken]=useState<string>("")

  return (
    <>
     <input type="text" placeholder='otp' />
     <input type="text" placeholder='new password' />
     <Turnstile 
     onSuccess={(token)=> {
          setToken(token)
     }}
     siteKey='0x4AAAAAABDy0ZrzLvi3HRvE' />
     <button
        onClick={()=> {
          axios.post("http://localhost:3000/reset-password", {
              "email":"barathraj048@gmail.com",
              "otp":"878570",
              "newPassword":"12345678",
              "token":token
          })
        }}     
     >set new password</button>
    </>
  )
}

export default App
