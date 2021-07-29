import React from 'react'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import {useUserState} from "./contexts/user"
function Admin(){
    const value= useUserState()[0]
    return (
        <>
            {(value===undefined)?<Login/>:<Dashboard/>}
        </>
    )
}
export default Admin