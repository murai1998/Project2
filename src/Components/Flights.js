import React, { Component } from "react";
import axios from "axios"

class Flights extends Component {
  state = {
    destCountry: this.props.match.params.country,
    destCity: this.props.match.params.city,
    flights: [],
    carriers: [],
    showTable: false
  }

  // first API call gets destinations ID and the second gets flight based on the two IDs
  getFlightInfo = (e) => {
    e.preventDefault()
    axios({
      "method":"GET",
      "url":`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${this.state.destCountry}/USD/en-US/`,
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key":process.env.REACT_APP_RAPIDAPI_KEY,
      "useQueryString":true
      },"params":{
      "query":`${this.state.destCity}`
      }
      })
      .then((response)=>{
        console.log(response)
        axios({
          "method":"GET",
          "url":`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${this.state.fromAirport}/${response.data.Places[0].PlaceId}/${this.state.departDate}`,
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
          "x-rapidapi-key":process.env.REACT_APP_RAPIDAPI_KEY,
          "useQueryString":true
          }
          })
          .then((response)=>{
            console.log(response)
            this.setState({
              flights: response.data.Quotes,
              carriers: response.data.Carriers,
              showTable: true
            })
          })
          .catch((error)=>{
            console.log(error)
          })
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  determineCarrier(id) {
    for (var elem of this.state.carriers) {
      if (elem.CarrierId === id)
        return elem.Name
    }
  }

  printFlights() {
    return this.state.flights.map((flight,i) => {
      return (
        <tr key={i}>
          <td>{this.determineCarrier(flight.OutboundLeg.CarrierIds[0])}</td>
          <td>${flight.MinPrice}</td>
        </tr>
      )
    })
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
    <div>
      <h1>Fligths</h1>
      <h3>Where will you depart?</h3>
      <form onSubmit={this.getFlightInfo}>
        <input
          onChange={this.handleChange}
          type="text"
          name="fromAirport"
          placeholder="e.g. LAX => LAX-sky"
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="departDate"
          placeholder="YYYY-MM or YYYY-MM-DD"
        />
        <button type="submit" name="submit">Submit</button>
      </form>
      {this.state.showTable ? (<table>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{this.printFlights()}</tbody>
      </table>) : null}
    </div>
    );
  }
}

export default Flights;