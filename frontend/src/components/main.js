import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Clubs from "./clubs";

const Main = () => {
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/clubs" component={Clubs}></Route>
    </Switch>
  );
};

export default Main;
