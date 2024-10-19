import React, { useEffect, useState } from 'react'

function UseDebound(inputvalue,timeinteravel) {
   const [value,setvalue]= useState('')
   
   useEffect(()=> {
      const handilesetvalue=()=> {
         setvalue(inputvalue)
      }
      const intravel=setTimeout(handilesetvalue(), timeinteravel)

      //clear function
      return ()=> {
         clearTimeout(intravel)
      }
   },[inputvalue,timeinteravel])
  return value
}

export default UseDebound
inputvalue,timeinteravel
useEffect(()=> {

},[inputvalue])