import React, { Component } from "react";
import axios from "axios";
import Itinerary from "./Itinerary";
import { Link } from "react-router-dom";

const emptyStar = "☆";
const fullStar = "★";
const yelpApiKey = process.env.REACT_APP_YELP_KEY;

class SingleActivity extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    currentYelpSingleActivity: {},
    currentYelpSingleActivityReviews: {},
    searchBarText: "",
    searchBarPlace: ""
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

  getYelpSingleActivity = async () => {
    axios({
      method: "GET",
      url: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/${
        this.props.match.params.businessId
      }`,
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      }
    })
      .then(response => {
        this.setState({
          currentYelpSingleActivity: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getYelpSingleActivityReviews = async () => {
    axios({
      method: "GET",
      url: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/${
        this.props.match.params.businessId
      }/reviews`,
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      }
    })
      .then(response => {
        this.setState({
          currentYelpSingleActivityReviews: response
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  displayPhotos = photoArray => {
    return photoArray?.map(photo => {
      return (
        <img
          style={{ width: "33%", height: "33%" }}
          src={photo}
          alt="Business"
        />
      );
    });
  };

  displayBusiness = business => {
    return (
      <div>
        <span>{this.displayPhotos(business?.photos)}</span>
        <h1>{business?.name}</h1>
        <span>
          {business?.rating} Stars {business?.review_count} Reviews
        </span>
        <br />
        <br />
        <span>
          <strong>{business?.price}</strong> {this.displayCategories(business)}
        </span>
        <br />
        <br />
        <span>{business?.display_phone}</span>
      </div>
    );
  };

  displayLocation = business => {
    return (
      <div>
        <h5>Address:</h5>
        <span>{business?.location.display_address[0]}</span>
        <br />
        <span>{business?.location.display_address[1]}</span>
      </div>
    );
  };

  configTime = time => {
    let symbol = "AM";
    let newTime = time[0] + time[1] + ":" + time[2] + time[3];
    newTime = newTime.split(":");
    let hours = Number(newTime[0]);

    if (hours > 12) {
      hours -= 12;
      symbol = "PM";
    }

    if (hours === 0) hours = 12;

    if (hours === 12) symbol = "PM";

    return `${hours}:${newTime[1]} ${symbol}`;
  };

  displayHours = business => {
    return business?.hours[0].open.map(hours => {
      let day = "";
      if (hours.day === 0) day = "Monday";
      if (hours.day === 1) day = "Tuesday";
      if (hours.day === 2) day = "Wednesday";
      if (hours.day === 3) day = "Thursday";
      if (hours.day === 4) day = "Friday";
      if (hours.day === 5) day = "Saturday";
      if (hours.day === 6) day = "Sunday";

      return (
        <div>
          <span>
            {day} {this.configTime(hours.start)} - {this.configTime(hours.end)}
          </span>
        </div>
      );
    });
  };

  displayReviews = () => {
    return this.state.currentYelpSingleActivityReviews.data?.reviews.map(
      review => {
        return (
          <div style={{ width: "20%", height: "400px", margin: "10px" }}>
            <span>
              Reviewed By: {review.user.name}{" "}
              <img
                style={{ width: "33%", height: "33%" }}
                src={review.user.image_url}
                alt="User Profile Pic"
              />
            </span>
            <br />
            <span>{review.rating} Stars</span>
            <br />
            <span>{review.time_created.slice(0, 10)}</span>
            <p>{review.text}</p>
          </div>
        );
      }
    );
  };

  displayCategories = business => {
    let categoryTitles = business?.categories.map(cat => {
      return cat.title + ", ";
    });
    categoryTitles = categoryTitles?.join(" ");
    categoryTitles = categoryTitles?.substring(0, categoryTitles.length - 2);
    return categoryTitles;
  };

  handleSearch = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.getYelpSingleActivity();
    this.getYelpSingleActivityReviews();
  }

  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/">Home</Link>

          <Link to={`/home/${this.state.country}/${this.state.city}/flights`}>
            Flights
          </Link>

          <Link to={`/home/${this.state.country}/${this.state.city}/hotels`}>
            Hotels
          </Link>

          <Link
            to={`/home/${this.state.country}/${this.state.city}/activities`}
          >
            Activities
          </Link>
        </div>
        <Itinerary itinerary={this.props.itinerary} />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Category or Business Name"
            name="searchBarText"
            onChange={this.handleSearch}
          />
          <input
            type="text"
            placeholder="Enter City"
            name="searchBarPlace"
            onChange={this.handleSearch}
          />
          <input type="submit" />
        </form>
        <div>
          {this.displayBusiness(this.state.currentYelpSingleActivity.data)}
        </div>
        {this.displayLocation(this.state.currentYelpSingleActivity.data)}
        <br />
        <br />
        {this.displayHours(this.state.currentYelpSingleActivity.data)}
        <br />
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center"
          }}
        >
          {this.displayReviews()}
        </div>
      </div>
    );
  }
}

export default SingleActivity;
