import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/Landing.css";

class LandingPage extends Component {
  state = {
    city: "",
    country: ""
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        <div className="landingStart">
          <div className="landingStart2">
            <h1>My Travel Guide</h1>
            <h2>Plan your dream trip today!</h2>
            <form>
              <input
                onChange={this.handleChange}
                type="text"
                name="city"
                placeholder="_______City_______"
              />
              <input
                onChange={this.handleChange}
                type="text"
                name="country"
                placeholder="______Country_____"
              />
              <Link to={`/home/${this.state.country}/${this.state.city}`}>
                <button>Start Your Vacation</button>
              </Link>
            </form>
          </div>
        </div>
        <div className="landingMiddle">
          <div className="midd">
            <h1>Your one-stop-shop </h1>
            <h1 id="h1Sec">for a perfect trip</h1>
          </div>
          <div className="landingMiddle2">
            <div className="landingText first">
              <p>
                Fully customizable multi-destination trip planner with popular
                itineraries to help you get started
              </p>
              <img src={require("../Images/gps.png")} alt="gps" />
            </div>
            <div className="landingText">
              <p>
                The hotel search with an extensive price comparison. The prices
                shown come from numerous hotels and booking websites
              </p>
              <img src={require("../Images/hotel.png")} alt="hotel" />
            </div>
            <div className="landingText">
              <p>
                The best flight deals near you to all the best vacation
                destinations
              </p>
              <img src={require("../Images/plane.png")} alt="plane" />
            </div>
            <div className="landingText">
              <p>
                Finding cool local hangouts and events as an undercover tourist
                can be difficult, right? No worries, let us take care of it!
              </p>
              <img
                src="https://cdn.onlinewebfonts.com/svg/img_120584.png"
                alt="vip"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
