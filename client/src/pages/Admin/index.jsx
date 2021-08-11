import React, { useEffect } from 'react'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import {useUserState} from "./contexts/user"
function Admin(){
    // const value= useUserState()[0]
    const [value,setValue]= useUserState()
    useEffect(_=>{
        if (value===undefined){
            console.log("reset")
            setValue("6111cb2d9fb9be3d9c3b2dc5")
        }
        console.log(value)
    },[value])
    return (
        <>
            {(value===undefined || value==="")?<Login/>:<Dashboard/>}
        </>
    )
}
export default Admin