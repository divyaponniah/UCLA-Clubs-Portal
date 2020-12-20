import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import SignUp from "./signup";
import Clubs from "./clubs";
import Events from "./events";
import Clubevents from "./clubevents";
import ClubDetails from "./club-details";

const Main = () => {
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/clubs" component={Clubs}></Route>
      <Route exact path="/events" component={Events}></Route>
      <Route exact path="/clubevents" component={Clubevents}></Route>
      <Route exact path="/club-details" component={ClubDetails}></Route>
    </Switch>
  );
};

export default Main;
