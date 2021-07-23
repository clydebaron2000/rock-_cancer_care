import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// pages 
import Home from "./pages/Home"
import Form from "./pages/PatientIntakeForm/"
import NotFound from "./pages/NotFound/"
import { useState } from "react";
import API from './utils/API'

// import MultiSelect from "react-multi-select-component";
// import CreatableSelect from 'react-select/creatable';
import Input from './global-components/Input'
// import Checkbox from './global-components/CheckBoxPrompt'
function App() {
  const[value,setValue]=useState()
  useEffect(_=>{
    console.log("EFFECT")
    // fetch()
  },[value])
  function fetch(){
    API.getPatients({"firstname":"l"}).then(res=>{
      if (res.data !== value){
        setValue(res.data)
      }
    })
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Form} />
        <Route path="/home" exact component={Home} />
        <Route component={NotFound}/> 
      </Switch>
    </Router>
    // <>
    //   <button onClick={fetch} style={{padding:"10px"}}>fetch</button>
    //   {value?.map?.(obj=>
    //     <div style={{padding:"20px"}}>
    //       {JSON.stringify(obj)}
    //     </div>
    //     )}
    //     <button onClick={()=>{
    //       API.createPatientTest().then(res=>{
    //         console.log("success!")
    //       }).catch(err=>console.error(err))
    //     }}>create</button>
    // </>
    // <Input
    //   type="radio"
    //   // value={value}
    //   name="hi"
    //   options={["a","b","c","d"]}
    //   onChange={e=>{
    //     // console.log(e.target.name)
    //     // console.log(e.target.value)
    //     // setValue(e.target.value)
    //   }}
    // />
    // </>
  )
}

export default App;
 // const [file,setFile]=useState(null)
  // const [dump,setDump]=useState()
  // const [first,setFirst]=useState()
  // const [last,setLast]=useState()
  // const fetch = () => {
  //   console.log('fetch called')
  //   API.getAllTests().then(res =>{
  //    setDump(res.data)
  //    console.log("fetch")
  // }).catch(err => console.log(err))
  // }
  // function submit(e){
  //   e.preventDefault()
  //   API.createTest({
  //     info:{ 
  //       name:{
  //         first:first,
  //         last:last, 
  //       },
  //     },
  //   }).then(res => console.log("success"))
  //     .catch(err => console.log(err))
  //   fetch()
  // }
  // fetch()



    // </Router> 
    // <div>
    //   <h1>posted</h1>
    //     <label>
    //       {first}
    //       <br/>
    //       <input type="text" onChange={e=>setFirst(e.target.value)}/>
    //     </label>
    //     <label>
    //       {last}
    //       <br/>
    //       <input type="text" onChange={e=>setLast(e.target.value)}/>
    //     </label>
    //   <button action="submit" onClick={submit}>upload</button>
    //   <br/>
    //   <p>
    //     {JSON.stringify(dump)}
    //   </p>
    // </div>