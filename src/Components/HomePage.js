import React, { Component } from "react";

class HomePage extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

export default HomePage;
