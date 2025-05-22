interface Game {
   id:number,
   blackPlayer:string,
   whitePlayer:string,
   moves:string[],
}

// class with singleton parttern
class store{
   game:Game[]

   private static instance:store//static mean this variable is shared across all instances of the class

   static getinstance(){
      if(!store.instance){
         this.instance=new store()
      }
      return this.instance
   }

   private constructor(){//private constructor to prevent instantiation from outside
      this.game = []
   }

   addGame(game:Game){
      this.game.push(game)
   }
   addmove(id:number,move:string){
      const game = this.game.find((game)=> game.id === id)
      if(game){
         game.moves.push(move)
      }
   }
}

export const game=store.getinstance()