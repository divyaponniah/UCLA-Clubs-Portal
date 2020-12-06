import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import signUp from "./signup"

const Main = () => {
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={signUp}></Route>
    </Switch>
  );
};

export default Main;
