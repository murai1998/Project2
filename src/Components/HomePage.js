import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Home Page</h1>
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
