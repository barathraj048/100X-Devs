import {requestCalculator} from "@/app/middlewares/requestCOunter"

export const middleware=(req:Request)=> {
   let count=requestCalculator.getInstance()
   console.log(count.incrementCounter())
}