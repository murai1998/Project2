import React, { Component } from "react";
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
    return (
      <div>
        <p>Temperature: {this.state.temperature},</p>
        <p>Humidity: {this.state.humidity},</p>
        <p>Description: {this.state.description}</p>
      </div>
    );
  }
}

export default Weather;
