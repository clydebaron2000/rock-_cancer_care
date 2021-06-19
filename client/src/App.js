import React from "react";
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
