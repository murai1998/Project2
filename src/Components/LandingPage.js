import React, { Component } from "react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  state = {
    city: "",
    country: ""
  };
  componentDidMount() {
    console.log(this.props);
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div>
        <h1>My Travel Guide</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            name="city"
            placeholder="City"
          />
          <input type="text" name="country" placeholder="Country" />
          <Link to={`/home/${this.state.country}/${this.state.city}`}>
            <button>Start Your Vacation</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default LandingPage;
