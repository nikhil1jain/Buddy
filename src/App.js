import React from "react";
import "./App.css";
import Login from "./containers/Login/Login";
import { Route, Switch } from "react-router-dom";
import SignUp from "./containers/SignUp/SignUp";
import Dashboard from "./containers/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
