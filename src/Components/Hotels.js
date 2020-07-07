import React, { Component } from "react";
import axios from "axios";

class Hotels extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    cityCode: ""
  };

  componentDidMount() {
    axios({
      "method":"GET",
      "url":"https://hotels4.p.rapidapi.com/locations/search",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"hotels4.p.rapidapi.com",
      "x-rapidapi-key":"988171317fmsh34f3af07264ce89p1c7493jsna8dc46a26613",
      "useQueryString":true
      },"params":{
      "locale":"en_US",
      "query":"new york"
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
        <h1>Hotels</h1>
      </div>
    );
  }
}

export default Hotels;
