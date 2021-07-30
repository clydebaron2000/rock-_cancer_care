import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './css/main.css'
import { UserProvider } from "./pages/Admin/contexts/user";
// pages 
import Home from "./pages/Home"
import PatientForm from "./pages/PatientIntakeForm/"
import Admin from "./pages/Admin/"
import NotFound from "./pages/NotFound/"
import VolunteerForm from "./pages/VolunteerIntakeForm"
function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/" exact component={Admin} /> */}
          <Route path="/volunteer-form" exact component={VolunteerForm} />
          <Route path="/patient-form" exact component={PatientForm} />
          <Route path="/admin" exact component={Admin} />
          <Route component={NotFound}/> 
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App;