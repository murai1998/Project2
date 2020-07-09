import React, { Component } from "react";
import axios from 'axios'

const emptyStar = '☆'
const fullStar = '★'
const yelpApiKey = ``

class SingleActivity extends Component {

	state = {
		country: this.props.match.params.country,
		city: this.props.match.params.city,
		currentYelpSingleActivity: {},
		currentYelpSingleActivityReviews: {}
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

	getYelpSingleActivity = async () => { 		
		axios({
		    method:"GET",
		    url:`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.businessId}`,
		    headers:{
		    Authorization: `Bearer ${yelpApiKey}`,
		    },
		    })
		    .then((response)=>{
		      this.setState({
		      	currentYelpSingleActivity:response
		      })
		    })
		    .catch((error)=>{
		      console.log(error)
		    })
	}

	getYelpSingleActivityReviews = async () => { 		
		axios({
		    method:"GET",
		    url:`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${this.props.match.params.businessId}/reviews`,
		    headers:{
		    Authorization: `Bearer ${yelpApiKey}`,
		    },
		    })
		    .then((response)=>{
		      this.setState({
		      	currentYelpSingleActivityReviews:response
		      })
		    })
		    .catch((error)=>{
		      console.log(error)
		    })
	}

	displayPhotos = (photoArray) => {
		return photoArray?.map(photo => {
			return <img style={{width:'33%', height:'400px'}} src = {photo} />
		})

	}

	displayBusiness = () =>{
		
		return(
		 <div>
		 <span>{this.displayPhotos(this.state.currentYelpSingleActivity.data?.photos)}</span>
		 <h1>{this.state.currentYelpSingleActivity.data?.name}</h1>
		 <span>{this.state.currentYelpSingleActivity.data?.rating} {this.state.currentYelpSingleActivity.data?.review_count} Reviews</span>
		 <br/>
		 <br/>
		 <span><strong>{this.state.currentYelpSingleActivity.data?.price} {this.state.currentYelpSingleActivity.data?.rating} Stars</strong></span>
		 </div>

		 )
	}

	displayReviews = () =>{

		return this.state.currentYelpSingleActivityReviews.data?.reviews.map(review=>{
			return( 
				<div style={{width:'20%', height:'400px', margin:'10px'}}>
				<span>Reviewed By: {review.user.name} <img style={{width:'33%', height:'33%'}} src={review.user.image_url} alt='User Profile Pic'/></span>
				<br/>
				<span>{review.rating} Stars</span>
				<br/>
				<span>{review.time_created.slice(0,10)}</span>
				<p>{review.text}</p>
				</div>
				)
		})
			
		}
	

	displayCategories = business => {
		let categoryTitles=''
		for(let category of business){
			console.log(category)
			categoryTitles += category.title + ', '
			}
			return categoryTitles.substring(0, categoryTitles.length - 2)	
	}

componentDidMount(){
		this.getYelpSingleActivity()
		this.getYelpSingleActivityReviews()
	}
	

  render() {
  	
    return (

      <div>
        <div>{this.displayBusiness()}</div>
        <div style={{display:'flex', alignItems:'center', alignContent:'center', justifyContent:'center'}}>{this.displayReviews()}</div>
        
      </div>
    );
  }
}

export default SingleActivity;
