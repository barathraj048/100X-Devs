
import {getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

const User=async()=> {
   let session =await getServerSession(authOptions)
   return(
      <div>
         session from server component
         {JSON.stringify(session)}
      </div>
   )
}


export default User