import React, { Component } from "react";
import axios from "axios";
import Itinerary from "./Itinerary";
import { Link } from "react-router-dom";
import "../Styles/SingleActivity.css";

const emptyStar = "☆";
const fullStar = "★";
const yelpApiKey = process.env.REACT_APP_YELP_KEY;

class SingleActivity extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city,
    currentYelpSingleActivity: {},
    currentYelpSingleActivityReviews: {},
    rStars:''
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
      return <img className="activityImages" src={photo} alt="Business" />;
    });
  };

  displayBusiness = business => {
    return (
      <div>
        <span id="imgActivities">{this.displayPhotos(business?.photos)}</span>
        <h1 className="businessName">{business?.name}</h1>
        <span>
          {this.props.location.prop?.r} {business?.review_count} Reviews
        </span>
        <br />
        <br />
        <span style={{ fontSize: "1.5em" }}>
          <strong>
            {business?.price} {this.displayCategories(business)}
          </strong>
        </span>
        <br />
        <br />
        <span>{business?.display_phone}</span>
        <br />
        <br />
      </div>
    );
  };

  displayLocation = business => {
    return (
      <div>
        <i>{business?.location.display_address[0]}</i>
        <br />
        <i>{business?.location.display_address[1]}</i>
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
          <div style={{ width: "fit-content", height: "fit-content" }}>
            <span>
              Reviewed By: {review.user.name}{" "}
              <img
                style={{ width: "15vw", height: "15vh" }}
                src={review.user.image_url}
                alt="User Profile Pic"
              />
            </span>
            <br />
            <span>{this.fillRate(review.rating)}</span>
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
      <div id="container">
        <div className="nav">
        <Link to={`/home/${this.state.country}/${this.state.city}`}>
            Home
          </Link>

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
        {/* <form onSubmit={this.handleSubmit}>
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
        </form> */}
        <div className="businessDisplay">
          {this.displayBusiness(this.state.currentYelpSingleActivity.data)}

          {this.displayLocation(this.state.currentYelpSingleActivity.data)}
          <br />
          <br />
          {this.displayHours(this.state.currentYelpSingleActivity.data)}
          <br />
          <br />
        </div>
        <div className="reviewsDisplay">{this.displayReviews()}</div>
      </div>
    );
  }
}

export default SingleActivity;
