import React, { useEffect, useState } from "react";
export default function App(){

    const [x,setx]= useState();
   useEffect(()=>{
    window.Products.products().then(response =>{
        setx(response);
      
    })
   
   })
   console.log(x)
    return(
   <>

        <h1>Hello assia !!!</h1>
        <button onClick={()=>{
            electron.notificationApi.sendNotification('hellooo')
        }}>Notification</button>
       
        <input defaultValue={x} readOnly={x}></input>

    </>
    ) 
}