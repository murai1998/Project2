import React, { Component } from "react";
import "../Styles/Itinerary.css";

class Itinerary extends Component {
  state = {
    showList: false
  };
  toggleList = () => {
    this.setState({
      showList: !this.state.showList
    });
  };
  printHotels = () => {
    return this.props.itinerary.hotels.map(hotel => {
      let price = "?";
      let rating = "?";
      if (hotel.starRating) rating = hotel.starRating;
      if (hotel.ratePlan) price = hotel.ratePlan.price.exactCurrent;
      return (
        <div>
          <li>{hotel.name}</li>
          <li>${price}</li>
          <li>{rating}</li>
        </div>
      );
    });
  };
  printFlights = () => {
    return this.props.itinerary.flights.map(flight => {
      return (
        <div>
          <li>{flight.MinPrice}</li>
        </div>
      );
    });
  };
  printActivity = () => {
    return this.props.itinerary.activities.map(activity => {
      return (
        <div>
          <li>{activity.name}</li>
          <li>{activity.rating}</li>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="full-container-itin">
        {console.log(this.props.itinerary)}
        Itinerary
        <button onClick={this.toggleList}>▼</button>
        {this.state.showList ? (
          <div>
            <h1>Hotels</h1>
            {this.printHotels()}
            <h1>Activities</h1>
            {this.printActivity()}
            <h1>Flights</h1>
            {this.printFlights()}
          </div>
        ) : null}
        {this.props.itinerary.activities[0]?.name}
      </div>
    );
  }
}

export default Itinerary;
