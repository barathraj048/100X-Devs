// prototype
class human{
   do(){
      return "Most Powerfull beings"
   }
}

const barath=Object.create(human.prototype,{
   name:{
      value:"Barath"
   }
})
console.log(barath.do())