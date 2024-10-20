interface User {
   name:string;
   age:number;
   email ?: string; //optionnal variable
}

const interface_pra=(User_details : User):void=> {

}
const user_det={
   name:'barath',
   age:19
}
interface_pra(user_det)

//interfacing class

interface Persion {
   name: string;
   age:number;
   Greet(msg : string) : void
}

class Employe implements Persion {
   name:string; //assigning types in class
   age:number

   constructor (n:string ,a:number){
      this.name=n;  //assigining constructors and its value
      this.age=a
   }
   Greet(msg: string): void {  //assigning function
      console.log(`${this.name} says ${msg}`)
   }
}

const barath = new Employe('barath',19)
barath.Greet('hellow Forkes')