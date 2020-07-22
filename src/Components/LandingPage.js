import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/Landing.css";

class LandingPage extends Component {
  state = {
    city: "",
    country: "",
    error: ""
  };

  handleChange = e => {
    e.preventDefault();
    if (e.target.value) {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        error: '"Please, enter the values!"'
      });
    }
  };
  render() {
    return (
      <div className='container'>
        <div className="landingStart">
          <div className="landingStart2">
            <h1>My Travel Guide</h1>
            <div>
            <form>
              <label>Plan Your Trip<br />Where do you want to go?</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="country"
                placeholder="Destination Country"
              />
              <input
                onChange={this.handleChange}
                type="text"
                name="city"
                placeholder="Destination City"
              />
              {this.state.country && this.state.country ? (
                <Link to={`/home/${this.state.country}/${this.state.city}`}>
                  <button>Start Your Vacation</button>
                </Link>
              ) : (
                <p>{this.state.error}</p>
              )}
            </form>
            </div>
          </div>
        </div>
        <div className="landingMiddle">
          <div className="midd">
            <h1>Your one-stop-shop for a perfect trip</h1>
          </div>
          <div className="landingMiddle2">
            <div className="landingText first">
              <img src={require("../Images/gps.png")} alt="gps" />
              <p>
                Fully customizable multi-destination trip planner with popular
                itineraries to help you get started
              </p>
            </div>
            <div className="landingText">
              <img src={require("../Images/hotel.png")} alt="hotel" />
              <p>
                Hotel search with an extensive price comparison. The prices
                shown come from numerous hotels and booking websites
              </p>
            </div>
            <div className="landingText">
              <img src={require("../Images/plane.png")} alt="plane" />
              <p>
                The best flight deals near you to all the best vacation
                destinations
              </p>
            </div>
            <div className="landingText">
              <img
                src="https://cdn.onlinewebfonts.com/svg/img_120584.png"
                alt="vip"
              />
              <p>
                Finding cool local hangouts and events as an undercover tourist
                can be difficult, right? No worries, let us take care of it!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
