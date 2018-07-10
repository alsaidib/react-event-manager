import React, { Component } from "react"
import axios from 'axios';



export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }
        this.fetchDataFromAPI();
        console.log(this.state.locations)
    }



    // this.fetchDataFromAPI()



    fetchDataFromAPI() {

        this.props.locationsList.map(city => {
            axios.get(`https://api.apixu.com/v1/forecast.json?key=xxxxxxxxxxxxxx&q=${city}&days=7&lang=nl`)
                .then((response) => {
                    // handle success
                    const locations = response.data.forecast.forecastday
                    console.log(locations);
                    this.setState({ locations: locations })

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        })
    }


    render() {

        return (

            <ul>
                {this.state.locations.map((location, index) => {
                    return (
                        <div key={index}>
                            <img src={location.day.condition.icon} alt="" />
                            <span>
                                {location.day.condition.text}
                            </span>
                        </div>
                    )
                }
                )}

            </ul>

        )

    }
}








