import React, { Component } from "react";
import axios from "axios"

class Flights extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    destinatioCodeId: ""
  }

  componentDidMount() {
    axios({
      "method":"GET",
      "url":`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${this.state.country}/USD/en-US/`,
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key":process.env.REACT_APP_RAPIDAPI_KEY,
      "useQueryString":true
      },"params":{
      "query":`${this.state.city}`
      }
      })
      .then((response)=>{
        console.log(response)
        this.setState({
          destinatioCodeId: response.data.Places[0].PlaceId
        })
      })
      .catch((error)=>{
        console.log(error)
      })
    // axios({
    //   "method":"GET",
    //   "url":"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/MIA-sky/LAX-sky/2020-09",
    //   "headers":{
    //   "content-type":"application/octet-stream",
    //   "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    //   "x-rapidapi-key":process.env.REACT_APP_RAPIDAPI_KEY,
    //   "useQueryString":true
    //   }
    //   })
    //   .then((response)=>{
    //     console.log(response)
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })
  }

  render() {
    return (
    <div>
      <h1>Fligths</h1>
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          type="text"
          name="city"
          placeholder="City"
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="country"
          placeholder="Country"
        />
      </form>
    </div>
    );
  }
}

export default Flights;
