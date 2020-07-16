import React, { Component } from "react";
import axios from "axios";
import "../Styles/Flights.css";
import { Link } from "react-router-dom";
import Itinerary from "./Itinerary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Flights extends Component {
  state = {
    destCountry: this.props.match.params.country,
    destCity: this.props.match.params.city,
    flights: [],
    carriers: [],
    showTable: false,
    showSrtBtns: false,
    departDate: new Date()
  };

  formatDate = date => {
    let returnDate = "";
    date = date.toString();

    returnDate += date.slice(11, 15) + "-";

    let month = date.slice(4, 7);

    if (month === "Jan") returnDate += "01-";
    if (month === "Feb") returnDate += "02-";
    if (month === "Mar") returnDate += "03-";
    if (month === "Apr") returnDate += "04-";
    if (month === "May") returnDate += "05-";
    if (month === "Jun") returnDate += "06-";
    if (month === "Jul") returnDate += "07-";
    if (month === "Aug") returnDate += "08-";
    if (month === "Sep") returnDate += "09-";
    if (month === "Oct") returnDate += "10-";
    if (month === "Nov") returnDate += "11-";
    if (month === "Dec") returnDate += "12-";

    returnDate += date.slice(8, 10);

    return returnDate;
  };

  // give user ability to choose which specific airport they depart from
  // for example inputting new york will give 7 different palces
  // from which i must select the apparoiate "##-sky" code
  // first API call gets destinations ID and the second gets flight based on the two IDs
  getFlightInfo = e => {
    e.preventDefault();
    //dont need destCountry becasue API treats it as market
    axios({
      method: "GET",
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        useQueryString: true
      },
      params: {
        query: `${this.state.destCity}`
      }
    })
      .then(response => {
        console.log(response);
        axios({
          method: "GET",
          url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${
            this.state.fromAirport
          }/${response.data.Places[0].PlaceId}/${this.formatDate(
            this.state.departDate
          )}`,
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host":
              "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
            useQueryString: true
          }
        })
          .then(response => {
            console.log(response);
            this.setState({
              flights: response.data.Quotes,
              carriers: response.data.Carriers,
              showTable: true,
              showSrtBtns: true
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  determineCarrier(id) {
    for (var elem of this.state.carriers) {
      if (elem.CarrierId === id) return elem.Name;
    }
  }

  determineDirect(d) {
    return d ? "Yes" : "No";
  }

  changeTime(str) {
    let time = str.split(":");
    let hours = Number(time[0]);
    let symbol = "A.M.";
    if (hours > 12) {
      hours -= 12;
      symbol = "P.M.";
    }
    if (hours === 0) hours = 12;

    return "" + hours + ":" + time[1] + " " + symbol;
  }

  printFlights() {
    if (this.state.flights.length === 0) {
      return (
        <tr>
          <td> No flights available from selected airport</td>
        </tr>
      );
    }
    return this.state.flights.map((flight, i) => {
      return (
        <tr key={i}>
          <td>{this.determineCarrier(flight.OutboundLeg.CarrierIds[0])}</td>
          <td>${flight.MinPrice}</td>
          <td>{flight.OutboundLeg.DepartureDate.slice(0, 10)}</td>
          <td>{this.changeTime(flight.QuoteDateTime.slice(11, 16))}</td>
          <td>{this.determineDirect(flight.Direct)}</td>
          <td>
            <input
              onChange={this.addToItinerary}
              type="checkbox"
              id={flight.QuoteId}
              checked={this.props.itinerary.flights.find(
                a => a.QuoteId === flight.QuoteId
              )}
            />
          </td>
        </tr>
      );
    });
  }

  handleDeparture = date => {
    this.setState({
      departDate: date
    });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // itinererary function
  addToItinerary = e => {
    let clickedFlight = this.state.flights.find(f => f.QuoteId == e.target.id);

    let carrier = this.determineCarrier(
      clickedFlight.OutboundLeg.CarrierIds[0]
    );
    clickedFlight.carrier = carrier;

    this.props.setItinerary("flights", clickedFlight);
  };

  sortPrice = () => {
    let flightsCopy = [...this.state.flights];
    flightsCopy.sort((a, b) => {
      if (a.MinPrice > b.MinPrice) return -1;
      else if (a.MinPrice < b.MinPrice) return 1;
      else return 0;
    });
    this.setState({
      flights: flightsCopy
    });
  };

  sortAirline = () => {
    let flightsCopy = [...this.state.flights];
    flightsCopy.sort((a, b) => {
      if (
        this.determineCarrier(a.OutboundLeg.CarrierIds[0]) >
        this.determineCarrier(b.OutboundLeg.CarrierIds[0])
      )
        return 1;
      else if (
        this.determineCarrier(a.OutboundLeg.CarrierIds[0]) <
        this.determineCarrier(b.OutboundLeg.CarrierIds[0])
      )
        return -1;
      else return 0;
    });
    this.setState({
      flights: flightsCopy
    });
  };

  sortDate = () => {
    let flightsCopy = [...this.state.flights];
    flightsCopy.sort((a, b) => {
      if (
        a.OutboundLeg.DepartureDate.slice(0, 10) >
        b.OutboundLeg.DepartureDate.slice(0, 10)
      )
        return 1;
      else if (
        a.OutboundLeg.DepartureDate.slice(0, 10) <
        b.OutboundLeg.DepartureDate.slice(0, 10)
      )
        return -1;
      else return 0;
    });
    this.setState({
      flights: flightsCopy
    });
  };

  render() {
    return (
      <div>
        <div className="nav">
          <Link to={`/home/${this.state.destCountry}/${this.state.destCity}`}>
            Home
          </Link>

          <Link
            to={`/home/${this.state.destCountry}/${this.state.destCity}/hotels`}
          >
            Hotels
          </Link>

          <Link
            to={`/home/${this.state.destCountry}/${this.state.destCity}/activities`}
          >
            Activities
          </Link>
        </div>
        <Itinerary
          setItinerary={this.props.setItinerary}
          itinerary={this.props.itinerary}
        />

        <div className="body-container">
          <h1 className="title">Fligths</h1>
          <h3>When/where will you depart?</h3>
          <form className="flights-form" onSubmit={this.getFlightInfo}>
            <DatePicker
              className="datePick"
              name="departDate"
              selected={this.state.departDate}
              onSelect={this.handleDeparture}
            />
            <input
              className="airlineInput"
              onChange={this.handleChange}
              type="text"
              name="fromAirport"
              placeholder="e.g. LAX"
            />
            <button id="buttonF" type="submit" name="submit">
              <img
                className="mag-img"
                alt="search"
                src={require("../Images/magnifier_search_searching_zoom-512.png")}
              ></img>
            </button>
          </form>
          {this.state.showSrtBtns ? (
            <div>
              <button className="sort-btn" onClick={this.sortPrice}>
                Sort by Price
              </button>
              <button className="sort-btn" onClick={this.sortAirline}>
                Sort by Airline
              </button>
              <button className="sort-btn" onClick={this.sortDate}>
                Sort by Date
              </button>
            </div>
          ) : null}
          {this.state.showTable ? (
            <div className="table-wrapper">
              <table className="flight-table">
                <thead>
                  <tr>
                    <th>Airline</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Direct</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>{this.printFlights()}</tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Flights;
