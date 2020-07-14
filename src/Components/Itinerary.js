import React, { Component } from "react";
import "../Styles/Itinerary.css";

import axios from "axios";

class Itinerary extends Component {
  state = {
    showList: false,
    name: "",
    email: "",
    message: ""
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

  handleSubmit(event) {
    axios({
      method: "POST",
      url: "http://localhost:3000/send",
      data: {
        name: this.state.name,
        email: this.state.email,
        messageHtml: "text"
      }
    }).then(response => {
      if (response.data.msg === "success") {
        alert("Email sent, awesome!");
        this.resetForm();
      } else if (response.data.msg === "fail") {
        alert("Oops, something went wrong. Try again");
      }
    });
  }

  resetForm() {
    this.setState({ name: "", email: "", message: "" });
  }

  render() {
    return (
      <div className="full-container-itin">
        {/* {console.log(this.props.itinerary)} */}
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

        {/* <form
          id="contact-form"
          onSubmit={this.handleSubmit.bind(this)}
          method="POST"
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={this.onNameChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={this.state.email}
              onChange={this.onEmailChange.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              rows="5"
              id="message"
              value={this.state.message}
              onChange={this.onMessageChange.bind(this)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form> */}
      </div>
    );
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }
}

export default Itinerary;
