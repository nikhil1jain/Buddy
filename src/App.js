import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signUp" component={SignUp} />
        <Route path="" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
