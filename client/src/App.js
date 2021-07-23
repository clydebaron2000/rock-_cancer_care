import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// pages
import Home from "./pages/Home"
import Form from "./pages/PatientIntakeForm/"
import NotFound from "./pages/NotFound/"

function App() {
  const[value,setValue]=useState()
  useEffect(_=>{
    // console.log("EFFECT")
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
  );
}


export default App;