import React, { Component } from "react";
import LandingPage from "./Components/LandingPage";
import { Link, Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Flights from "./Components/Flights";
import Hotels from "./Components/Hotels";
import Activities from "./Components/Activities";
import SingleHotel from "./Components/SingleHotel";
import SingleActivity from "./Components/SingleActivity";
import Itinerary from "./Components/Itinerary";

class App extends Component {

  state={
    itinerary: {

      flights:[],
      hotels: [],
      activities:[]

    }
  }

  setItinerary = (component, thing) => {

    let itineraryCopy = {...this.state.itinerary}
    

    if(component==='activities'){
      if(!itineraryCopy.activities.includes(thing))
        itineraryCopy.activities.push(thing)
      else{
        itineraryCopy.activities.splice(itineraryCopy.activities.indexOf(thing),1)
      }
    }

    if (component==='flights') {
      if(!itineraryCopy.flights.includes(thing))
        itineraryCopy.flights.push(thing)
      else{
        itineraryCopy.flights.splice(itineraryCopy.flights.indexOf(thing),1)
      }
    }

    this.setState({
      itinerary: itineraryCopy
    })
    console.log(this.state.itinerary)
  }

  render() {
    return (
      <div>
        <Itinerary itinerary={this.state.itinerary}/>
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
            render={props => <Flights {...props} itinerary = {this.state.itinerary} setItinerary={this.setItinerary} />}
          />
          <Route
            exact
            path="/home/:country/:city/hotels"
            render={props => <Hotels {...props} itinerary = {this.state.itinerary} setItinerary={this.setItinerary} />}
          />
          <Route
            exact
            path="/home/:country/:city/activities"
            render={props => <Activities {...props} itinerary = {this.state.itinerary} setItinerary={this.setItinerary} />}
          />
          <Route
            exact
            path="/:name/:country/:city/:hotelId"
            render={props => <SingleHotel {...props} />}
          />
          <Route
            exact
            path="/:name/:country/:city/activities/:businessId"
            render={props => <SingleActivity {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
