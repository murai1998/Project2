import React, { Component } from "react";
import LandingPage from "./Components/LandingPage";
import { Link, Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Flights from "./Components/Flights";
import Hotels from "./Components/Hotels";
import Activities from "./Components/Activities";
import SingleHotel from "./Components/SingleHotel";
import NewWindow from "react-new-window";
class App extends Component {
  state = {
    hotels: []
  };

  setHotels = hotels => {
    this.setState({ hotels });
  };
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
          <Route
            exact
            path="/home/:country/:city/flights"
            render={props => <Flights {...props} />}
          />
          <Route
            exact
            path="/home/:country/:city/hotels"
            render={props => (
              <Hotels
                setHotels={this.setHotels}
                hotels={this.state.hotels}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/home/:country/:city/activities"
            render={props => <Activities {...props} />}
          />

          <Route
            exact
            path="/:name/:country/:city/:hotelId"
            render={props => <SingleHotel {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
