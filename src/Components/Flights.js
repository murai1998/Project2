import React, { Component } from "react";
import axios from "axios";
import "../Styles/Flights.css";
import { Link } from "react-router-dom";
import Itinerary from "./Itinerary";


class Flights extends Component {
  state = {
    destCountry: this.props.match.params.country,
    destCity: this.props.match.params.city,
    flights: [],
    carriers: [],
    showTable: false,
    showSrtBtns: false
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
          url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${this.state.fromAirport}/${response.data.Places[0].PlaceId}/${this.state.departDate}`,
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
            />
          </td>
        </tr>
      );
    });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // itinererary function
  addToItinerary = e => {
    let clickedFlight = this.state.flights.find(f => {
      return f.QuoteId == e.target.id;
    });
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
    {console.log(this.props)}
    return (
      <div className="full-container">
      <Itinerary itinerary={this.props.itinerary}/>
        <Link
          className="notes4"
          to={
            "/home/" +
            this.props.match.params.country +
            "/" +
            this.props.match.params.city
          }
        >
          <img
            width="170vw"
            height="150vh"
            src="https://www.pinclipart.com/picdir/big/405-4059078_png-file-svg-transparent-white-home-button-clipart.png"
            alt="home-button"
          />
        </Link>
        <h1 className="title">Fligths</h1>
        <h3>Where/when will you depart?</h3>
        <form className="flights-form" onSubmit={this.getFlightInfo}>
          <input
            onChange={this.handleChange}
            type="text"
            name="fromAirport"
            placeholder="e.g. LAX"
          />
          <input
            onChange={this.handleChange}
            type="text"
            name="departDate"
            placeholder="YYYY-MM-DD"
          />
          <button type="submit" name="submit">
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
    );
  }
}

export default Flights;
