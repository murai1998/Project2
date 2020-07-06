import React, { Component } from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";

class HomePage extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <h1>Home Page</h1>
        <h2>
          {this.state.city}, {this.state.country}
        </h2>
        <div>
          <Weather city={this.state.city} country={this.state.country} />
        </div>
        <Link to={`/home/${this.state.country}/${this.state.city}/flights`}>
          Flights
        </Link>
        <Link to={`/home/${this.state.country}/${this.state.city}/hotels`}>
          Hotels
        </Link>
        <Link to={`/home/${this.state.country}/${this.state.city}/activities`}>
          Activities
        </Link>
      </div>
    );
  }
}

export default HomePage;
