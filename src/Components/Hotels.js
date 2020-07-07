import React, { Component } from "react";
import axios from "axios";
import hotels from "./hotels.json";

class Hotels extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    hotels: hotels
  };

  /* componentDidMount() {
    axios({
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/locations/search",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
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
              process.env.REACT_APP_RAPIDAPI_KEY,
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
            console.log(response2.data.data.body.searchResults.results);
            this.setState({
              hotels: response2.data.data.body.searchResults.results
            });
          })
          .catch(error2 => {
            console.log(error2);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }*/
  showHotels = () => {
    return this.state.hotels.map((hotel, i) => {
      console.log(hotels);
      let price = "";
      if (hotel.ratePlan !== undefined) {
        price = hotel.ratePlan.price.current;
        console.log(price);
      } else {
        price = "*";
        console.log(price);
      }
      return (
        <tr key={i}>
          <td>{hotel.id}</td>
          <td>{hotel.name}</td>
          <td>{price}</td>
          <td>{hotel.starRating}</td>
          <td>{hotel.neighbourhood}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <h1>Hotels</h1>
        <button onClick={this.sortByPop}>Sort by price</button>
        <button onClick={this.sortByName}>Sort by star rating</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Star Rating</th>
              <th>Neighbourhood</th>
            </tr>
          </thead>
          <tbody>{this.showHotels()}</tbody>
        </table>
        <p>* - Price is unavailable now, please call the hotel directly.</p>
      </div>
    );
  }
}

export default Hotels;
