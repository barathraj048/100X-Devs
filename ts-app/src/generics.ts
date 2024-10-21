const return_first_ele=<T>(array : T[])=> { //T indicate anu type it can be
   return array[0]
}

const val=return_first_ele<number>([1,2,3])  
const val2=return_first_ele(['hi','im','the','king'])

console.log(val)
console.log(val2)
