import React, { Component } from "react";
import axios from "axios";
import { Map, GoogleApiWrapper } from "google-maps-react";
import SyncLoader from "react-spinners/SyncLoader";
import "../Styles/HomePage.css";

const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;

const mapStyles = {
  border: "5px solid lightblue",
  width: "40%",
  height: "1px",
};

class MapContainer extends Component {
  state = {
    loading: true,
    city: this.props.city,
    country: this.props.country
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/countries",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "988171317fmsh34f3af07264ce89p1c7493jsna8dc46a26613",
        useQueryString: true
      },
      params: {
        limit: "1",
        namePrefix: `${this.state.country}`
      }
    })
      .then(response => {
        // console.log(response)
        let countryCode = response.data.data[0]?.code;
        setTimeout(() => {
          axios({
            method: "GET",
            url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
            headers: {
              "content-type": "application/octet-stream",
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
              "x-rapidapi-key":
                "988171317fmsh34f3af07264ce89p1c7493jsna8dc46a26613",
              useQueryString: true
            },
            params: {
              limit: "1",
              countryIds: `${countryCode}`,
              namePrefix: `${this.state.city}`
            }
          })
            .then(response => {
              // console.log(response)
              this.setState({
                lat: response.data.data[0].latitude,
                long: response.data.data[0].longitude,
                loading: false
              });
            })
            .catch(error => {
              console.log(error);
            });
        }, 3000);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // console.log(this)
    return (
      <div>
        {this.state.loading ? (
          <SyncLoader color={"lightblue"} />
        ) : (
          <Map
            className="map"
            google={this.props.google}
            zoom={14}
            initialCenter={{
              lat: this.state.lat,
              lng: this.state.long
            }}
          />
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_KEY
})(MapContainer);
