import React, { Component } from 'react';
import "../Styles/Itinerary.css"

class Itinerary extends Component {
  render() {
    return (
      <div className="full-container-itin">
        {console.log(this.props.itinerary)}
        Itinerary
        <button>▼</button>
        {this.props.itinerary.activities[0]?.name}
      </div>
    );
  }
}

export default Itinerary;