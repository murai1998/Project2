import React, { Component } from "react";
import axios from "axios"

class Flights extends Component {
  
  componentDidMount() {
    axios({
      "method":"GET",
      "url":"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
      "useQueryString":true
      },"params":{
      "query":"Stockholm"
      }
      })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  render() {
    return (
    <div>
      <h1>Fligths</h1>
    </div>
    );
  }
}

export default Flights;
