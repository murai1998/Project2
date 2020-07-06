import React, { Component } from 'react';

class LandingPage extends Component {
  render() {
    return (
      <div>
        <form onSubmit={props.starVac}>
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="country" placeholder="Country" />
          <button>Start Your Vacation</button>
        </form>
      </div>
    );
  }
}

export default LandingPage;