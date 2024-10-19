const num:number =1
console.log(num)

const fun =(a:number,b:number): number=> {
   return (a+b)
}
fun(2,3)

// below function take another function as input and run it after 1 second

const runAfter1s=(ipFunction : ()=> void) => {
   setTimeout(() => {
      ipFunction()
   }, 1000);
}
const funnyFun = () : void=> {
   console.log(`Im so funny :)`)
}

runAfter1s(funnyFun)