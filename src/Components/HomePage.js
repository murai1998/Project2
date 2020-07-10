import React, { Component } from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import MapContainer from "./MapContainer"
import "../Styles/HomePage.css";

class HomePage extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city
  };

  render() {
    //console.log(this.props);
    return (
      <div className="home1">
        <div className="home1">
          <div className="nav">
            <Link to="/">
              <img
                className="house"
                width="200vw"
                height="200vh"
                src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png"
                alt="home-button"
              />
            </Link>
            <div className="allNotes">
              <div className="notes">
                <Link
                  className="notes2"
                  to={`/home/${this.state.country}/${this.state.city}/flights`}
                >
                  Flights
                </Link>
              </div>
              <div className="notes">
                <Link
                  className="notes2"
                  to={`/home/${this.state.country}/${this.state.city}/hotels`}
                >
                  Hotels
                </Link>
              </div>
              <div className="notes">
                <Link
                  className="notes2"
                  to={`/home/${this.state.country}/${this.state.city}/activities`}
                >
                  Activities
                </Link>
              </div>
            </div>
          </div>
          <div className="weather-map">
            <Weather city={this.state.city} country={this.state.country}/>
            <MapContainer country={this.state.country} city={this.state.city}/>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
