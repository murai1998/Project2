import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/Activities.css";
const emptyStar = "☆";
const fullStar = "★";
const yelpApiKey = process.env.REACT_APP_YELP_KEY;

class Activities extends Component {
  state = {
    currentYelpRestaurants: {},
    currentYelpShopping: {},
    currentYelpMisc: {}
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
    /*let itinCopy = [...this.state.itin]*/
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

    /*clickedBusiness.isChecked = !clickedBusiness.isChecked*/

    this.props.setItinerary("activities", clickedBusiness);

    /*if(!this.props.itinerary.activities.includes(clickedBusiness))
			this.props.setItinerary('activities', clickedBusiness)

		else{
			this.props.itinerary.activities.splice(this.props.itinerary.activities.indexOf(clickedBusiness),1)
			this.props.setItinerary('activities', clickedBusiness)
		}*/

    /*if(!itinCopy.includes(clickedBusiness)){
			itinCopy.push(clickedBusiness)
		}
		else{
			itinCopy.splice(itinCopy.indexOf(clickedBusiness),1)
		}
		this.setState({
			itin:itinCopy
		})*/
  };

  displayBussinesses = bus => {
    return bus?.businesses.map((business, i) => {
      if (i < 5) {
        return (
          <div
            className="eachActv"
            key={i}
            style={{
              border: "1px solid black",
              width: "218px",
              height: "440px",
              margin: "5px"
            }}
          >
            <img
              style={{ width: "218px", height: "218px" }}
              src={business.image_url}
              alt="Business"
            />
            <Link
              className="linkName"
              to={`/home/${this.state.country}/${this.state.city}/activities/${business.id}`}
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
            <span>
              <input
                onChange={this.handleChange}
                type="checkbox"
                id={business.id}
              />
            </span>
          </div>
        );
      }
      i++;
    });
  };

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
        /*response.data.businesses.forEach(business => business['isChecked']=false)*/
        this.setState({
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
        <Link
          className="notes3"
          to={`/home/${this.state.country}/${this.state.city}`}
        >
          <img
            className="house"
            width="170vw"
            height="150vh"
            src="https://www.pinclipart.com/picdir/big/405-4059078_png-file-svg-transparent-white-home-button-clipart.png"
            alt="home-button"
          />
        </Link>
        <div
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
        >
          <h1 style={{ margin: "auto" }}>Restaurants</h1>
          <div style={{ display: "flex", margin: "auto" }}>
            {this.displayBussinesses(this.state.currentYelpRestaurants.data)}
          </div>
          <h1 style={{ margin: "auto" }}>Shopping</h1>
          <div style={{ display: "flex", margin: "auto" }}>
            {this.displayBussinesses(this.state.currentYelpShopping.data)}
          </div>
          <h1 style={{ margin: "auto" }}>Things To Do</h1>
          <div style={{ display: "flex", margin: "auto" }}>
            {this.displayBussinesses(this.state.currentYelpMisc.data)}
          </div>
        </div>
      </div>
    );
  }
}

export default Activities;
