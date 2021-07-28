import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './css/main.css'
// pages 
// import Home from "./pages/Home"
import Form from "./pages/PatientIntakeForm/"
import Admin from "./pages/Admin/"
import NotFound from "./pages/NotFound/"
import { UserProvider } from "./pages/Admin/contexts/user";
function App() {
  return (
    <Router>
      <Switch>
          {/* <Route path="/" exact component={Admin} /> */}
        <UserProvider>
          {/* <Route path="/" exact component={Admin} /> */}
          <Route path="/form" exact component={Form} />
          <Route path="/admin" exact component={Admin} />
        </UserProvider>
          <Route component={NotFound}/> 
      </Switch>
    </Router>
  )
}

export default App;