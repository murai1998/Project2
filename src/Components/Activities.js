import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Activities.css";
import Itinerary from "./Itinerary";
import SyncLoader from "react-spinners/SyncLoader";


const emptyStar = "☆";
const fullStar = "★";
const yelpApiKey = process.env.REACT_APP_YELP_KEY;

class Activities extends Component {
  state = {
    currentYelpRestaurants: {},
    currentYelpShopping: {},
    currentYelpMisc: {},
    loadingRestaurants: true,
    loadingShopping: true,
    loadingMisc: true
  };

  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    currentYelpRestaurants: {},
    currentYelpShopping: {},
    currentYelpMisc: {},
    itin: []
  };

  fillRate = rating => {
    let rate = "";
    let j = Math.floor(rating);
    let i = 0;
    while (i < 5) {
      if (j > 0) {
        rate += fullStar;
        i++;
        j--;
      }
      if (j === 0) {
        if (i < 5) {
          rate += emptyStar;
          i++;
        }
      }
    }
    return rate;
  };

  displayCategories = business => {
    let categoryTitles = "";
    for (let category of business.categories) {
      categoryTitles += category.title + ", ";
    }
    return categoryTitles.substring(0, categoryTitles.length - 2);
  };

  handleChange = e => {
    let clickedBusiness =
      this.state.currentYelpRestaurants.data.businesses.find(
        business => business.id === e.target.id
      ) ||
      this.state.currentYelpShopping.data.businesses.find(
        business => business.id === e.target.id
      ) ||
      this.state.currentYelpMisc.data.businesses.find(
        business => business.id === e.target.id
      );
    this.props.setItinerary("activities", clickedBusiness, e.target.id);
  };

  displayBussinesses = bus => {
    return bus?.businesses.map((business, i) => {
      if (i < 10) {
        return (
          <div
            className="eachActv"
            key={i}
            style={{
              border: "1px solid black",
              width: "218px",
              height: "fit-content",
              minHeight:'440px',
              margin: "5px"
            }}
          >
            <img
              style={{ width: "218px", height: "218px" }}
              src={business.image_url}
              alt="Business"
            />
            <Link
              to={{
                pathname:`/home/${this.state.country}/${this.state.city}/activities/${business.id}`,
                className:"linkName",
            prop:{
              r:this.fillRate(business.rating)
            }
              }}
            >
              <h2>{business.name}</h2>
            </Link>
            <span>
              {this.fillRate(business.rating)} {business.review_count} Reviews
            </span>
            <br />
            <br />
            <span>
              <strong>{business.price}</strong>{" "}
              {this.displayCategories(business)}
            </span>
            <br />
            <br />
            <span> <strong>Add</strong>
              <input
                onChange={this.handleChange}
                type="checkbox"
                id={business.id}
                checked = { this.props.itinerary.activities.find(a => a.id === business.id)}
              />
            </span>
          </div>
        );
      }
      i++;
    });
  };

  hamburgerDrop = () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  getYelpRestaurants = async () => {
    axios({
      method: "GET",
      url: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${
        this.props.match.params.city
      }`,
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      },
      params: {
        categories: "restaurants"
      }
    })
      .then(response => {
        this.setState({
          loadingRestaurants:false,
          currentYelpRestaurants: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getYelpShopping = async () => {
    axios({
      method: "GET",
      url: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${
        this.props.match.params.city
      }`,
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      },
      params: {
        categories: "shopping"
      }
    })
      .then(response => {
        this.setState({
          loadingShopping:false,
          currentYelpShopping: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getYelpMisc = async () => {
    axios({
      method: "GET",
      url: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?location=${
        this.props.match.params.city
      }`,
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      },
      params: {
        categories: "active"
      }
    })
      .then(response => {
        this.setState({
          loadingMisc:false,
          currentYelpMisc: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getYelpRestaurants();
    this.getYelpShopping();
    this.getYelpMisc();
  }

  render() {
    return (
      <div className="activityBack">
        <div class="topnav">
        <Link to={`/home/${this.state.country}/${this.state.city}`} className='active'>My Travel Guide</Link>
        <div id="myLinks">
        <Link to={`/home/${this.state.country}/${this.state.city}/flights`}>
            Flights
          </Link>

          <Link to={`/home/${this.state.country}/${this.state.city}/hotels`}>
            Hotels
          </Link>

          <Link to="/">Change Destination</Link>
  </div>
  <button className="icon" onClick={this.hamburgerDrop}>
    <i className="fa fa-bars"></i>
  </button>
</div>
        <div className="nav">
        <Link to="/">Change Destination</Link>

          <Link to={`/home/${this.state.country}/${this.state.city}/flights`}>
            Flights
          </Link>

          <Link to={`/home/${this.state.country}/${this.state.city}/hotels`}>
            Hotels
          </Link>
          <Link to={`/home/${this.state.country}/${this.state.city}`}>
            Home
          </Link>
        </div>
        <Itinerary clearItinerary={this.props.clearItinerary} setItinerary={this.props.setItinerary} itinerary={this.props.itinerary} />

        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
        >
          <h1 style={{ margin: "auto" }}>Restaurants</h1>
          <div
            className="blocks"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              flexWrap: "wrap"
            }}
          >
            <SyncLoader
        className="spinner"
        color={'#8d6aa1'}
        loading={this.state.loadingRestaurants}
      />
            {this.displayBussinesses(this.state.currentYelpRestaurants.data)}
          </div>
          <h1 style={{ margin: "auto" }}>Shopping</h1>
          <div
            className="blocks"
            style={{
              display: "flex",
              margin: "auto",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            <SyncLoader
        className="spinner"
        color={"#e37b6f"}
        loading={this.state.loadingShopping}
      />
            {this.displayBussinesses(this.state.currentYelpShopping.data)}
          </div>
          <h1 style={{ margin: "auto" }}>Things To Do</h1>
          <div
            className="blocks"
            style={{
              display: "flex",
              margin: "auto",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            <SyncLoader
        className="spinner"
        color={"#FFAF7B"}
        loading={this.state.loadingMisc}
      />
            {this.displayBussinesses(this.state.currentYelpMisc.data)}
          </div>
        </div>
      </div>
    );
  }
}

export default Activities;
