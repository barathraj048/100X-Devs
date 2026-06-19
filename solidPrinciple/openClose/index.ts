//open close means interface can't be modifyed only expand by implements

interface IPaymentMethode{
   process(amount:number):void
}

class creditCard implements IPaymentMethode{
   process(amount: number): void {
      console.log("console log process hear")
   }
}
class upi implements IPaymentMethode{
   process(amount: number): void {
      //do the process hear
   }
}
class Paypall implements IPaymentMethode{
   process(amount: number): void {
      //do here
   }
}

// heare open close + dependency inversion
export class paymentProcess{
   private paymentMethod:IPaymentMethode
   constructor(method:IPaymentMethode){
      this.paymentMethod=method
   }
   process(amount:number):void{
      this.paymentMethod.process(amount)
   }
} 


// while calling it can pass the engine
const payment=new paymentProcess(new upi())
payment.process(100)