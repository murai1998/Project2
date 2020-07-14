import React, { Component } from "react";
import "../Styles/Weather.css";
const API_KEY = "31cd2a867c978a67956c6a09c99c0c25";

class Weather extends Component {
  state = {
    temperature: undefined,
    city: this.props.city,
    country: this.props.country,
    humidity: undefined,
    description: undefined
  };
  getWeather = async () => {
    let city = this.state.city;
    let country = this.state.country;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`
    );
    const data = await api_call.json();
    if (data === undefined) {
      return window.location();
    }
    this.setState({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description
    });
  };
  componentDidMount() {
    this.getWeather();
  }
  render() {
    console.log(this.props);
    return (
      <div className="weather-wrapper">
        <h1 className="weather-title">
          {" "}
          {this.state.city}, {this.state.country}{" "}
        </h1>
        <div className="weather-info">
          <p>
            <strong>Temperature:</strong> {this.state.temperature} F,{" "}
          </p>
          <p>
            <strong>Humidity:</strong> {this.state.humidity},{" "}
          </p>
          <p>
            <strong>Description:</strong> {this.state.description}{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default Weather;
