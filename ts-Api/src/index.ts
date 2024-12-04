//Pick 

interface User{
   UserName:string,  //cant able to change this only able to read 
   readonly _id:number,
   age:number,
   readonly password:string
}
type updateConst=Pick<User ,'UserName' | 'age'> //creating subset of user for only update name and age 

//canalso use exclude
type updateConsts=Exclude<User,'password'>

type partialUpdate =Partial<updateConst> //partial makes it as optional props

const UpdateUser=(updatedProps:partialUpdate)=>{
   //updation logic
   // User.FindbyIdandUpdate(updatedProps)
}
const updateddata={
   age:12
}
UpdateUser(updateddata)

type config={
   readonly apikey:string,
   readonly Secrot:string
}
const aptconfig:Readonly<config>={
   apikey:'jjkblkbklbklsfblkbf',
   Secrot:'jufvfbssbvlb'
}


//records and map


type id = Record<string ,{name:string,id:number}>

const newid :id ={
   'identification':{
      name:'dvkjbkb',
      id:2
   }
}
// map function
interface Idenitiy{
   name:string,
   age:number
}
const username=new Map<string, Idenitiy>()

username.set('entification',{
   name:'dlkdjblkjv',
   age:4
})
