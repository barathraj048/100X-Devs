//dependency injection mean a class doesnot have mail engine to perform the action 
// import "twillioApi" from "twillio-Library"
interface twillioApi{
   api:string,
   sendNotification(
      phoneNumber: number,
      message: string
  ): void;
}

export class notification{
   private smsApi:twillioApi
   constructor(clientApi:twillioApi){
      this.smsApi=clientApi
   }
   sendNotification(phoneNumber:number,message:string){
      this.smsApi.sendNotification(phoneNumber,message)
   }
}