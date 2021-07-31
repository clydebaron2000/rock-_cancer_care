import { useState } from "react"
// import {useUserState} from '../contexts/user' 
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
                        {(process.env.NODE_ENV==="development")?<button className="minor-button" onClick={createUser}>create</button>:null}
                    </div>
                </form>
            </div>
    ) 
}  
export default Dashboard 