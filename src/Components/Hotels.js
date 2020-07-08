import React, { Component } from "react";
import axios from "axios";
import hotels from "./hotels.json";
import { Link, Switch, Route } from "react-router-dom";

class Hotels extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    hotels: [],
    showForm: false,
    checkIn: "",
    checkOut: ""
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
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
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            pageSize: "50",
            adults1: "1"
          }
        })
          .then(response2 => {
            console.log(response2);
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
  }

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  showHotels = () => {
    return this.state.hotels.map((hotel, i) => {
      let price = "*";
      if (hotel.ratePlan !== undefined) {
        price = hotel.ratePlan.price.exactCurrent;
        console.log(price);
      }
      return (
        <tr key={i}>
          <Link
            to={`/${hotel.name}/${this.state.country}/${this.state.city}/${hotel.id}`}
          >
            <td>{hotel.id}</td>
          </Link>
          <td>{hotel.name}</td>
          <td>${price}</td>
          <td>{hotel.starRating}</td>
          <td>{hotel.address.streetAddress}</td>
        </tr>
      );
    });
  };
  sortPrice = () => {
    let arr = [...this.state.hotels];
    let res = arr.sort((a, b) => {
      if (a.ratePlan !== undefined && b.ratePlan !== undefined) {
        if (a.ratePlan.price.exactCurrent > b.ratePlan.price.exactCurrent)
          return 1;
        if (a.ratePlan.price.exactCurrent < b.ratePlan.price.exactCurrent)
          return -1;
        if (a.ratePlan.price.exactCurrent === 0) return 0;
      }
    });
    this.setState({
      hotels: res.sort((a, b) => {
        if (a.ratePlan === undefined || b.ratePlan === undefined) {
          return a;
        }
        return b.ratePlan.price.exactCurrent - a.ratePlan.price.exactCurrent;
      })
    });
  };
  sortRate = () => {
    let arr2 = [...this.state.hotels];

    this.setState({
      hotels: arr2.sort((a, b) => b.starRating - a.starRating)
    });
  };

  render() {
    return (
      <div>
        <Link to={`/home/${this.state.country}/${this.state.city}`}>
          <img
            className="house"
            width="170vw"
            height="150vh"
            src="https://www.pinclipart.com/picdir/big/405-4059078_png-file-svg-transparent-white-home-button-clipart.png"
            alt="home-button"
          />
        </Link>

        <button onClick={this.toggleForm}>
          Find your perfect Hotel right now!
        </button>
        {this.state.showForm ? (
          <form>
            <label>Check In:</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="checkIn"
              placeholder="YYYY-MM-DD"
            />
            <br />
            <label>Check out:</label>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="checkOut"
              placeholder="YYYY-MM-DD"
            />
            <br />
            <br />
            <input
              className="submit"
              type="submit"
              onClick={this.componentDidMount}
            />
          </form>
        ) : (
          ""
        )}

        <h1>Hotels</h1>
        <button onClick={this.sortPrice}>Sort by price</button>
        <button onClick={this.sortRate}>Sort by star rating</button>
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
