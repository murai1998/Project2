import React, { Component } from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import MapContainer from "./MapContainer";
import Itinerary from "./Itinerary";
import "../Styles/HomePage.css";
import Itinerary from "./Itinerary";


class HomePage extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city
  };

  render() {
    return (
      
        <div>
          <div className="nav">
            <Link to="/">
              Home
            </Link>
            
                <Link
                  to={`/home/${this.state.country}/${this.state.city}/flights`}
                >
                  Flights
                </Link>
              
                <Link
                  to={`/home/${this.state.country}/${this.state.city}/hotels`}
                >
                  Hotels
                </Link>
             
                <Link
                  to={`/home/${this.state.country}/${this.state.city}/activities`}
                >
                  Activities
                </Link>

                <Itinerary itinerary={this.props.itinerary}/>
              
            </div>
          <div className="home1">
          <div className="weather-map">
            <Weather city={this.state.city} country={this.state.country} />
            <MapContainer country={this.state.country} city={this.state.city} />
          </div>
          </div>
          </div>
    );
  }
}

export default HomePage;
