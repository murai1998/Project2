import React, { Component } from "react";
import TestForm from "./Test-Form";
import TestWeather from "./Test-Weather";

//this is a test
const API_KEY = "31cd2a867c978a67956c6a09c99c0c25";

var Amadeus = require("amadeus");

var amadeus = new Amadeus({
  clientId: "uqcGBXe3uhl9Iv0bTCEubWkZjhkVKjva",
  clientSecret: "UQ3ofp4YNAndrhiv"
});

// amadeus.shopping.flightOffersSearch
//   .get({
//     originLocationCode: "DAL",
//     destinationLocationCode: "BKK",
//     departureDate: "2020-08-01",
//     adults: "2"
//   })
//   .then(function(response) {
//     console.log(response.data);
//   })
//   .catch(function(responseError) {
//     console.log(responseError.code);
// });

class TestApp extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`
    );
    const data = await api_call.json();
    console.log(data);
    if (country && city) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please, enter the values!"
      });
    }
  };
  render() {
    return (
      <div>
        <h1>Current Weather</h1>
        <TestForm getWeather={this.getWeather} />
        <TestWeather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default TestApp;
