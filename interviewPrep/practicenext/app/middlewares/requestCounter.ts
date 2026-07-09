import type { Request,Response,NextFunction } from "express"

export class requestCalculator{
   public counter :number=0
   private static instance:requestCalculator
   constructor(){}

   public static getInstance(){
      if(!this.instance){
         this.instance=new requestCalculator()
      }
      return this.instance
   }

   incrementCounter(){
      this.counter+=1
      return this.counter
   }
}

