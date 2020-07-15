import React, { Component } from "react";
import "../Styles/Itinerary.css";
import axios from "axios";
var nodemailer = require("nodemailer");

class Itinerary extends Component {
  state = {
    showList: false,
    showItem: true,
    receiverEmail: "",
    feedback: "",
    formSubmitted: false
  };
  toggleList = e => {
    e.preventDefault();
    if (e.target.innerText === "▼") e.target.innerText = "▲";
    else {
      e.target.innerText = "▼";
    }
    this.setState({
      showList: !this.state.showList
    });
  };
  delete = (item, name) => {
    // let index = this.props.itinerary[name].indexOf(item);
    // this.props.itinerary[name].splice(index, 1);
    // console.log(this.props.itinerary[name]);
    // this.setState({
    //   showItem: false
    // });
    this.props.setItinerary("hotels", item);
    console.log(this.props.setItinerary);
  };
  printHotels = () => {
    return this.props.itinerary.hotels.map((hotel, i) => {
      let price = "?";
      let rating = "?";
      if (hotel.starRating) rating = hotel.starRating;
      if (hotel.ratePlan) price = hotel.ratePlan.price.exactCurrent;

      return (
        <div>
          <strong>{i + 1}) </strong> ${price} - {hotel.name}
          <button
            onClick={() => {
              this.delete("hotels", hotel);
            }}
          >
            Remove
          </button>
        </div>
      );
    });
  };
  printFlights = () => {
    return this.props.itinerary.flights.map((flight, i) => {
      return (
        <div>
          <strong>{i + 1}) </strong>${flight.MinPrice} - {flight.carrier}
          <button
            onClick={() => {
              this.delete("flights", flight);
            }}
          >
            Remove
          </button>
        </div>
      );
    });
  };
  printActivity = () => {
    return this.props.itinerary.activities.map((activity, i) => {
      return (
        <div>
          <strong>{i + 1}) </strong>
          {activity.name}
          <button
            onClick={() => {
              this.delete("activities", activity);
            }}
          >
            Remove
          </button>
        </div>
      );
    });
  };

  delete = (name, item) => {
    this.props.setItinerary(name, item);
  };

  //   handleSubmit(event) {
  //     var transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: "smilet.report@gmail.com",
  //         pass: "wjFUIHI14"
  //       }
  //     });
  //     const mailOptions = {
  //       from: "smilet.report@gmail.com", // sender address
  //       to: "annmuray75@gmail.com", // list of receivers
  //       subject: "Subject of your email", // Subject line
  //       html: "<p>Hanna-banana</p>" // plain text body
  //     };
  //     transporter.sendMail(mailOptions, function(err, info) {
  //       if (err) console.log(err);
  //       else console.log(info);
  //     });
  //   }

  static sender = "sender@example.com";

  handleChange = event => {
    this.setState({
      receiverEmail: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //const receiverEmail = "annmuray75@gmail.com";
    const template = "template_4plM1jBi";
    console.log(process.env.REACT_APP_EMAILJS_USERID);
    this.sendFeedback(
      template,
      this.sender,
      this.state.receiverEmail,
      //this.state.feedback,
      process.env.REACT_APP_EMAILJS_USERID
    );

    this.setState({
      formSubmitted: true
    });
  };

  // Note: this is using default_service, which will map to whatever
  // default email provider you've set in your EmailJS account.
  sendFeedback(templateId, senderEmail, receiverEmail, user) {
    window.emailjs
      .send(
        "default_service",
        templateId,
        {
          senderEmail,
          receiverEmail,

          activityText: this.props.itinerary.activities
            .map((activity, i) => {
              return `${i + 1}) ${activity.name}`;
            })
            .join("<br />"),
          hotelText: this.props.itinerary.hotels
            .map((hotel, i) => {
              return `${i + 1}) $${hotel.ratePlan.price.exactCurrent} - ${
                hotel.name
              }`;
            })
            .join("<br />"),
          flightText: this.props.itinerary.flights
            .map((flight, i) => {
              return `${i + 1}) $${flight.MinPrice} - ${flight.carrier}`;
            })
            .join("<br />")
        },

        user
      )
      .then(res => {
        this.setState({
          formEmailSent: true
        });
        console.log(res);
      })
      // Handle errors here however you like
      .catch(err => console.error("Failed to send feedback. Error: ", err));
  }

  render() {
    return (
      <div className="full-container-itin">
        <div className="drop">
          <h2>Cart</h2>
          <button onClick={this.toggleList}>▼</button>
        </div>
        {this.state.showList ? (
          <div>
            <table className="mainTable">
              <thead>
                <tr>
                  <th>Hotels</th>
                  <th>Activities</th>
                  <th>Flights</th>
                </tr>
              </thead>
              <tbody className="smallTable">
                <td>{this.printHotels()}</td>
                <td> {this.printActivity()}</td>
                <td>{this.printFlights()}</td>
              </tbody>
            </table>

            <form onSubmit={this.handleSubmit}>
              <label>Send it to your email add</label>
              <input
                type="email"
                className="text-input"
                id="feedback-entry"
                name="feedback-entry"
                onChange={this.handleChange}
                placeholder="email address"
                required
                value={this.receiverEmail}
              />
              <div className="btn-group">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn--submit"
                />
              </div>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}
// Itinerary.propTypes = {
//   env: Itinerary.object.isRequired
// };
export default Itinerary;
