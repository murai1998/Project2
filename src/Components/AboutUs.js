import React, { Component } from 'react';
import { Link } from "react-router-dom"
import "../Styles/AboutUs.css"

class AboutUs extends Component {
  state = {
    country: this.props.match.params.country,
    city: this.props.match.params.city
  };

  render() {
    return (
      <div className="about-wrapper">
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
          <Link to={`/home/${this.state.country}/${this.state.city}/activities`}>
            Activities
          </Link>
        </div>
        <h1 className="about-title">Developers</h1>
        <div className="info-section">
          <div className="info-container">
            <h2> Renzo Pederzoli </h2> 
            <img className="profile-pic" src={require("../Images/back-button.png")}alt="profile-pic"></img>
            <div className="link-imgs">
              <a target="_blank" href="https://github.com/RenzoPederzoli">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/renzop9/">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div className="info-container">
            <h2> Hanna Murai </h2>
            <img className="profile-pic" src={require("../Images/back-button.png")}alt="profile-pic"></img>
            <div className="link-imgs">
              <a target="_blank" href="https://github.com/murai1998">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/hmurai/">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </div> 
          </div>
          <div className="info-container">
            <h2> Andrew Harari </h2>
            <img className="profile-pic" src={require("../Images/back-button.png")}alt="profile-pic"></img>  
            <div className="link-imgs">
              <a target="_blank" href="https://github.com/hararia">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/aharari/">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </div>      
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;