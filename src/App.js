import React, { Component } from "react";
import LandingPage from "./Components/LandingPage";
import { Link, Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route
            exact
            path="/home/:country/:city"
            render={props => <HomePage {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
