import React,{lazy,Suspense} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './css/main.css'
import { UserProvider } from "./pages/Admin/contexts/user";
// pages 
const Home = lazy(_=> import("./pages/Home"))
const PatientForm = lazy(_=> import("./pages/PatientIntakeForm/"))
const Admin = lazy(_=> import("./pages/Admin/"))
const NotFound = lazy(_=> import("./pages/NotFound/"))
const VolunteerForm = lazy(_=> import("./pages/VolunteerIntakeForm"))
function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/" exact component={Admin} /> */}
        <Route path="/volunteer-form" exact component={VolunteerForm} />
        <Route path="/patient-form" exact component={PatientForm} />
        <UserProvider>
          <Route path="/admin" exact component={Admin} />
        </UserProvider>
        <Route component={NotFound}/> 
      </Switch>
      </Suspense>
    </Router>
  )
}

export default App;