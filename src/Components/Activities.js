import React, { Component } from "react";
import axios from 'axios'

const yelpApiKey = ``
const emptyStar = '☆'
const fullStar = '★'
class Activities extends Component {

	state = {
		currentYelpRestaurants: {},
		currentYelpShopping: {},
		currentYelpMisc: {}
	}

	fillRate = (rating) => {
		let rate = ''
		let j = Math.floor(rating)
		let i = 0
		while(i<5){
			if(j>0){
				rate+=fullStar
				i++
				j--
			}
			if(j===0){
				if(i<5){
				rate+=emptyStar
				i++
				}
			}
		}
	return rate
	}

	displayCategories = business => {
		let categoryTitles=''
		for(let category of business.categories){
			categoryTitles += category.title + ', '
			}
			return categoryTitles.substring(0, categoryTitles.length - 2)	
	}

	displayBussinesses = (bus) =>{
		return bus?.businesses.map((business)=>{
			return(
			 <div style={{border:'1px solid black', width:'218px', height:'414px', margin:'5px'}}>
			 <img style={{width:'218px', height:'218px'}} src={business.image_url}/>
			 <h2>{business.name}</h2>
			 <span>{this.fillRate(business.rating)} {business.review_count} Reviews</span>
			 <br/>
			 <br/>
			 <span><strong>{business.price}</strong> {this.displayCategories(business)}</span>
			 </div>
			 )
		})
	}

	getYelpRestaurants = async () => { 		
		axios({
		    method:"GET",
		    url:`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.props.match.params.city}`,
		    headers:{
		    Authorization: `Bearer ${yelpApiKey}`,
		    },
		    params: {
			  categories: 'restaurants',
			  limit:5
			}
		    })
		    .then((response)=>{
		      this.setState({
		      	currentYelpRestaurants:response
		      })
		    })
		    .catch((error)=>{
		      console.log(error)
		    })
	}

	getYelpShopping = async () => { 		
		axios({
		    method:"GET",
		    url:`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.props.match.params.city}`,
		    headers:{
		    Authorization: `Bearer ${yelpApiKey}`,
		    },
		    params: {
			  categories: 'shopping',
			  limit: 5
			}
		    })
		    .then((response)=>{
		      this.setState({
		      	currentYelpShopping:response
		      })
		    })
		    .catch((error)=>{
		      console.log(error)
		    })
	}

	getYelpMisc = async () => { 		
		axios({
		    method:"GET",
		    url:`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.props.match.params.city}`,
		    headers:{
		    Authorization: `Bearer ${yelpApiKey}`,
		    },
		    params: {
			  categories: 'active',
			  
			}
		    })
		    .then((response)=>{
		      this.setState({
		      	currentYelpMisc:response
		      })
		    })
		    .catch((error)=>{
		      console.log(error)
		    })
	}

	componentDidMount(){
		this.getYelpRestaurants()
		this.getYelpShopping()
		this.getYelpMisc()
	}

  render() {
	console.log(this.state.currentYelpRestaurants.data?.businesses)
    return (

      <div>
        <h1>Activities</h1>
        <div style={{display:'flex', flexWrap:'wrap'}}>
        {this.displayBussinesses(this.state.currentYelpRestaurants.data)}
        {this.displayBussinesses(this.state.currentYelpShopping.data)}
        {this.displayBussinesses(this.state.currentYelpMisc.data)}
        </div>
      </div>
    );
  }
}

export default Activities;
