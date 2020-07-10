import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import images from "./imgHotels.json";
import "../Styles/SingleHotel.css";

class SingleHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      hotel: [],
      city: this.props.match.params.city,
      country: this.props.match.params.country,
      name: this.props.match.params.name,
      hotelId: this.props.match.params.hotelId,
      images: images.splice(0, 8)
    };
  }
/*
  componentDidMount() {
    axios({
      method: "GET",
      url: "https://hotels4.p.rapidapi.com/properties/get-hotel-photos",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "hotels4.p.rapidapi.com",
        "x-rapidapi-key": "988171317fmsh34f3af07264ce89p1c7493jsna8dc46a26613",
        useQueryString: true
      },
      params: {
        id: this.state.hotelId
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          images: response.data.hotelImages.splice(0, 8)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }*/
  showImages = () => {
    return this.state.images.map((image, i) => {
      let s = image.baseUrl;
      let end = s.indexOf("_");
      let final = s.slice(0, end + 1) + "z.jpg";
      return (
        <img className="imagesRoom" key={i} src={final} alt="hotel room" />
      );
    });
  };
  render() {
    console.log(this.state.name);
    return (
      <div className="hotelBackg">
        <div className="buttonsHot">
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
          <Link
            className="notes3"
            to={`/home/${this.state.country}/${this.state.city}/hotels`}
          >
            <img
              className="house"
              width="200vw"
              height="200vh"
              src="https://vizionz.boydnetonline.com/wp-content/uploads/2019/07/kisspng-logo-organization-photography-brand-go-back-button-5b3f520fef8813.4474823615308764319811-1.png"
              alt="home-button"
            />
          </Link>
        </div>
        <div className="room">
          <h1>
            {this.state.name}, {this.state.city}
          </h1>
          <div>{this.showImages()}</div>
        </div>
      </div>
    );
  }
}

export default SingleHotel;
