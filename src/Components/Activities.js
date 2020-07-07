import React, { Component } from "react";
import axios from 'axios'

const yelpApiKey 

class Activities extends Component {

	getYelp = async () => { 		
		axios({
		    method:"GET",
		    url:`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${'Fort Lauderdale'}`,
		    headers:{
		    Authorization: `Bearer ${yelpApiKey}`,
		    },
		    params: {
			  categories: 'animalshelters',
			}
		    })
		    .then((response)=>{
		      console.log(response)
		    })
		    .catch((error)=>{
		      console.log(error)
		    })
	}

	componentDidMount(){
		this.getYelp()
	}

  render() {

    return (
      <div>
        <h1>Activities</h1>
      </div>
    );
  }
}

export default Activities;
