import React, { Component } from "react";
import axios from "axios";
let Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: "S0FAxRuVD6DgoEunfDeO9Brh1YRlLRBA",
  clientSecret: "y3GnGD41wD0U9hbu"
});

class Hotels extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    cityCode: ""
  };

  render() {
    let res = amadeus.referenceData.locations
      .get({
        keyword: this.state.city,
        subType: "CITY"
      })
      .then(function(response) {
        //console.log(response.data[0].iataCode);
        return response.data[0].iataCode;
      })
      .catch(function(response) {
        console.error(response);
      });
    console.log(res);
    /*amadeus.shopping.hotelOffers
      .get({
        cityCode: res.data[0].iataCode
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.error(response);
      });*/
    return (
      <div>
        <h1>Hotels</h1>
      </div>
    );
  }
}

export default Hotels;
