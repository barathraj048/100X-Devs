import { game } from "./store";
import { LogMoves } from "./logger";

LogMoves
setTimeout(()=> {
   game.addGame({
      id: 1,
      blackPlayer: "black",
      whitePlayer: "white",
      moves: []
   })
},2000)