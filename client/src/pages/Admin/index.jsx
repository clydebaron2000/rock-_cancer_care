import { useEffect } from 'react';
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import {useUserState} from "./contexts/user"
import devConsole from '../../utils/devConsole'
function Admin(){
    // const value= useUserState()[0]
    const [value,setValue]= useUserState()
    useEffect(_=>{
        if (value===undefined){
            devConsole.log("reset")
        }
        devConsole.log("value",value)
    },[value])
    return (
        <>
            {(value===undefined || value==="")?<Login/>:<Dashboard/>}
        </>
    )
}
export default Admin