import { useState } from "react"
import {useUserState} from '../contexts/user' 
import devConsole from "../../../utils/devConsole"
import '../../../css/login.css'
import API from "../../../utils/API"
function Dashboard(){
    const setUserID=useUserState()[1]
    //for admin panel override
    // setUserID("6111cb2d9fb9be3d9c3b2dc5")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [err_msg,setErr]=useState("")
    function onSubmit(){
        devConsole.log("submit")
        devConsole.log(username)
        devConsole.log(password)
        API.verifyUser({username:username,password:password}).then(res=>{
            devConsole.log(res.data)
            if (res.data===null){
                setErr("invalid username or password")
            }else{
                setErr("")
                setUserID(res.data)
            }
        }).catch(err=>{
            devConsole.error(err)
            devConsole.log(Object.keys(err))
            devConsole.log(err.toJSON)
            devConsole.log(err.response.data)
            if (typeof err.response.data === "string")
                setErr(err.response.data)
        })
    }
    function createUser(){
        devConsole.log("create")
        devConsole.log(username)
        devConsole.log(password)
        API.createUser({username:username,password:password}).then(res=>{
            devConsole.log(res)
            devConsole.log(res.data)
            devConsole.log("created successfully")
        }).catch(console.error)
    }
    return (
        <div className="overlay">
            <div className="login-card">
                <form onSubmit={e=>e.preventDefault()}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={username} onChange={({target})=>setUsername(target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" value={password} onChange={({target})=>setPassword(target.value)}/>
                    <div className="error">{err_msg}</div>
                    <div className="button-container">
                        <button className="action-button" onClick={onSubmit}>login</button>
                        {(process.env.NODE_ENV==="development")?<button className="minor-button" onClick={createUser}>create</button>:null}
                    </div>
                </form>
            </div>
        </div>
    ) 
}  
export default Dashboard 