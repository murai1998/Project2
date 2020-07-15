import React, { Component } from "react";
import "../Styles/Itinerary.css";
import axios from "axios";

class Itinerary extends Component {
  state = {
    showList: false,
    showItem: true
  };
  toggleList = e => {
    e.preventDefault();
    if (e.target.innerText === "▼") e.target.innerText = "▲";
    else {
      e.target.innerText = "▼";
    }
    this.setState({
      showList: !this.state.showList
    });
  };
  delete = (item, name) => {
    // let index = this.props.itinerary[name].indexOf(item);
    // this.props.itinerary[name].splice(index, 1);
    // console.log(this.props.itinerary[name]);
    // this.setState({
    //   showItem: false
    // });
    this.props.setItinerary("hotels", item);
    console.log(this.props.setItinerary);
  };
  printHotels = () => {
    return this.props.itinerary.hotels.map((hotel, i) => {
      let price = "?";
      let rating = "?";
      if (hotel.starRating) rating = hotel.starRating;
      if (hotel.ratePlan) price = hotel.ratePlan.price.exactCurrent;

      return (
        <div>
          <strong>{i + 1} </strong> {price} - {hotel.name}
          <button
            onClick={() => {
              this.delete(hotel, "hotels");
            }}
          >
            Remove
          </button>
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

  handleSubmit = () => {
    console.log("start");
    var nodemailer = require("nodemailer");
    console.log("finish");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "smilet.report@gmail.com",
        pass: "wjFUIHI14"
      }
    });
    const mailOptions = {
      from: "smilet.report@gmail.com", // sender address
      to: "annmuray75@gmail.com", // list of receivers
      subject: "Subject of your email", // Subject line
      html: "<p>Your html here</p>" // plain text body
    };
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  };

  render() {
    return (
      <div className="full-container-itin">
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
        {this.handleSubmit()}
      </div>
    );
  }
}

export default Itinerary;
