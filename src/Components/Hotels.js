import React, { Component } from "react";
import axios from "axios";

class Hotels extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    cityCode: ""
  };
  componentDidMount() {
    const axios = require("axios");

    axios({
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/search",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "520b2c9402mshf46439b682e852dp1733d4jsn81c2c3d744d0",
        useQueryString: true
      },
      params: {
        locale: "en_US",
        query: "new york"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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
