import React, { Component } from "react";
import axios from "axios";

class Hotels extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/search",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "988171317fmsh34f3af07264ce89p1c7493jsna8dc46a26613",
        useQueryString: true
      },
      params: {
        locale: "en_US",
        query: `${this.state.city} ${this.state.country}`
      }
    })
      .then(response => {
        //console.log(response.data.suggestions[3].entities[0].destinationId);
        axios({
          method: "GET",
          url: "https://hotels4.p.rapidapi.com/properties/list",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key":
              "988171317fmsh34f3af07264ce89p1c7493jsna8dc46a26613",
            useQueryString: true
          },
          params: {
            currency: "USD",
            locale: "en_US",
            sortOrder: "BEST_SELLER",
            destinationId:
              response.data.suggestions[0].entities[0].destinationId,
            pageNumber: "1",
            checkIn: "2020-01-08",
            checkOut: "2020-01-15",
            pageSize: "50",
            adults1: "1"
          }
        })
          .then(response2 => {
            console.log(response2);
          })
          .catch(error2 => {
            console.log(error2);
          });
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
