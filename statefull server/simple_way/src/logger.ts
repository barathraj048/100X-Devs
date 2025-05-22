import { game } from "./store";

export let LogMoves=()=> {
   setTimeout(()=> {
      console.log("Game moves: ",game);
   },2000)
}