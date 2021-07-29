import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './css/main.css'
// pages 
// import Home from "./pages/Home"
import PatientForm from "./pages/PatientIntakeForm/"
import Admin from "./pages/Admin/"
import NotFound from "./pages/NotFound/"
import { UserProvider } from "./pages/Admin/contexts/user";
import VolunteerForm from "./pages/VolunteerIntakeForm"
function App() {
  return (
    <Router>
      <Switch>
          {/* <Route path="/" exact component={Admin} /> */}
        <UserProvider>
          {/* <Route path="/" exact component={Admin} /> */}
          <Route path="/volunteer-form" exact component={VolunteerForm} />
          <Route path="/patient-form" exact component={PatientForm} />
          <Route path="/admin" exact component={Admin} />
        </UserProvider>
          <Route component={NotFound}/> 
      </Switch>
    </Router>
  )
}

export default App;