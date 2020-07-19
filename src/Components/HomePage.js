import React, { Component } from "react";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import MapContainer from "./MapContainer";
import "../Styles/HomePage.css";
import Itinerary from "./Itinerary";

class HomePage extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city
  };

  hamburgerDrop = () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  render() {
    return (
      <div>
        <div class="topnav">
  <span className="active">My Travel Guide</span>
  <div id="myLinks">
  <Link to={`/home/${this.state.country}/${this.state.city}/flights`}>
            Flights
          </Link>

          <Link to={`/home/${this.state.country}/${this.state.city}/hotels`}>
            Hotels
          </Link>

          <Link
            to={`/home/${this.state.country}/${this.state.city}/activities`}
          >
            Activities
          </Link>
          <Link to="/">Change Destination</Link>
          <Link to={`/home/${this.state.country}/${this.state.city}/aboutus`}>
            About Us
          </Link>
  </div>
  <button className="icon" onClick={this.hamburgerDrop}>
    <i className="fa fa-bars"></i>
  </button>
</div>
        <div className="nav">
        <Link to="/">Change Destination</Link>
          <Link to={`/home/${this.state.country}/${this.state.city}/flights`}>
            Flights
          </Link>

          <Link to={`/home/${this.state.country}/${this.state.city}/hotels`}>
            Hotels
          </Link>

          <Link
            to={`/home/${this.state.country}/${this.state.city}/activities`}
          >
            Activities
          </Link>
          <Link to={`/home/${this.state.country}/${this.state.city}/aboutus`}>
            About Us
          </Link>
        </div>
        <div className="home1">
          <div className="home-nav">
            <Itinerary
              clearItinerary={this.props.clearItinerary}
              setItinerary={this.props.setItinerary}
              itinerary={this.props.itinerary}
            />
          </div>
          <h3 id="instr">
            Add flights, activities, and hotels to your Itinerary and never lose the
            best deals. Send it to your email for safekeeping!
          </h3>
          <Weather city={this.state.city} country={this.state.country} />
          <MapContainer country={this.state.country} city={this.state.city} />
        </div>
      </div>
    );
  }
}

export default HomePage;
