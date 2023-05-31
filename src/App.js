import './App.css';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Signin from './components/Signin';
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
    <Route exact path="/">
        <Home></Home>
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
      </Switch>
        
    </Router>
     
    </div>
  );
}

export default App;
