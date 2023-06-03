import './App.css';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Signin from './components/Signin';
import DashBoard from './dashboardcomponent/DashBoard';
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
    <Route exact path="/">
        <Login></Login>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/signin">
          <Signin></Signin>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/dashboard"><DashBoard></DashBoard></Route>
      </Switch>
        
    </Router>
     
    </div>
  );
}

export default App;
