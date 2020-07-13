import React, { Component } from "react";
import "../Styles/Itinerary.css";

class Itinerary extends Component {
  state = {
    showList: false
  };
  toggleList = (e) => {
    e.preventDefault()
    if(e.target.innerText==='▼')
      e.target.innerText='▲'
    else{
    e.target.innerText='▼'}  
    this.setState({
      showList: !this.state.showList
    });
  };
  printHotels = () => {
    return this.props.itinerary.hotels.map((hotel, i) => {
      let price = "?";
      let rating = "?";
      if (hotel.starRating) rating = hotel.starRating;
      if (hotel.ratePlan) price = hotel.ratePlan.price.exactCurrent;
      return (
        <div>
          <strong>{i + 1}) </strong> ${price} - {hotel.name}
        </div>
      );
    });
  };
  printFlights = () => {
    return this.props.itinerary.flights.map((flight, i) => {
      return (
        <div>
          <strong>{i + 1}) </strong>${flight.MinPrice} - name
        </div>
      );
    });
  };
  printActivity = () => {
    return this.props.itinerary.activities.map((activity, i) => {
      return (
        <div>
          <strong>{i + 1}) </strong>
          {activity.name}
        </div>
      );
    });
  };
  render() {
    return (
      <div className="full-container-itin">
        {console.log(this.props.itinerary)}
        <div className="drop">
          <h2>Cart</h2>
          <button onClick={this.toggleList}>▼</button>
        </div>
        {this.state.showList ? (
          <div>
            <table className="mainTable">
              <thead>
                <tr>
                  <th>Hotels</th>
                  <th>Activities</th>
                  <th>Flights</th>
                </tr>
              </thead>
              <tbody className="smallTable">
                <td>{this.printHotels()}</td>
                <td> {this.printActivity()}</td>
                <td>{this.printFlights()}</td>
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Itinerary;
