<<<<<<< HEAD
import React, { Component } from 'react';

=======
import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";

//this is a test
const API_KEY = "31cd2a867c978a67956c6a09c99c0c25";

var Amadeus = require("amadeus");

var amadeus = new Amadeus({
  clientId: "uqcGBXe3uhl9Iv0bTCEubWkZjhkVKjva",
  clientSecret: "UQ3ofp4YNAndrhiv"
});

amadeus.shopping.flightOffersSearch
  .get({
    originLocationCode: "DAL",
    destinationLocationCode: "BKK",
    departureDate: "2020-08-01",
    adults: "2"
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(responseError) {
    console.log(responseError.code);
  });
amadeus.shopping.hotelOffers
  .get({
    cityCode: "MAD"
  })
  .then(function(response) {
    console.log(response.data);
  });
>>>>>>> 9c735ee8d1361a8f49eb259b0aa10c2e3d44b038
class App extends Component {
  render() {
    return (
      <div>
        <h1> MY TRAVEL GUIDE</h1>
      </div>
    );
  }
}

export default App;