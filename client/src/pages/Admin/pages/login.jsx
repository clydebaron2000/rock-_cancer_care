import { useState } from "react"
import {useUserState} from '../contexts/user'
import devConsole from "../../../utils/devConsole"
import '../../../css/login.css'
import API from "../../../utils/API"
function Dashboard(){
    // const [_,setUserID]=useUserState()
    const [uname,setUname]=useState("")
    const [pword,setPword]=useState("")
    const [err_msg,setErr]=useState("")
    function onSubmit(){
        devConsole.log("submit")
        devConsole.log(uname)
        devConsole.log(pword)
        API.verifyUser({username:uname,password:pword}).then(res=>{
            devConsole.log(res.data)
            if (res.data===null){
                setErr("invalid username or password")
            }else{
                setErr("")
                // if (res.data) setUserID(res.data)
            }
        }).catch(err=>{
            console.error(err)
            console.log(Object.keys(err))
            console.log(err.toJSON)
            console.log(err.response.data)
            setErr(err.response.data)
        })
    }
    function createUser(){
        devConsole.log("create")
        devConsole.log(uname)
        devConsole.log(pword)
        API.createUser({username:uname,password:pword}).then(res=>{
            devConsole.log(res.data)
            devConsole.log("created successfully")
        }).catch(console.error)
    }
    return (
            <div className="login-card">
                <form onSubmit={e=>e.preventDefault()}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={uname} onChange={({target})=>setUname(target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" value={pword} onChange={({target})=>setPword(target.value)}/>
                    <div className="error">{err_msg}</div>
                    <div className="button-container">
                        <button className="action-button" onClick={onSubmit}>login</button>
                        <button className="minor-button" onClick={createUser}>create</button>
                    </div>
                </form>
            </div>
    ) 
}  
export default Dashboard 