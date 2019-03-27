import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import './App.css';
import Spot from './components/spot';
import Marker from './components/marker';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      allSpots: [],
      selectedSpot: null,
      search: ""
    };
  }
  
  componentDidMount() {
    const url = "https://raw.githubusercontent.com/artosousa/spot-boilerplate/master/spots.json";
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        spots: data,
        allSpots: data
      });
    })
  }

  selectSpot = (spot) => {
    console.log(spot);
    this.setState({
      selectedSpot: spot
    })
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      spots: this.state.allSpots.filter((spot) => new RegExp(event.target.value, "i").exec(spot.name + spot.type + spot.about ))
    })
  }
  render () {

    let center = {
      lat: 41.3851,
      lng: 2.1734 
    }
    let zoom = 13;

    if(this.state.selectedSpot) {
      center = {
        lat: this.state.selectedSpot.lat,
        lng: this.state.selectedSpot.lng
      }
      zoom = 16
    }
    return(
      <div className="app">
        <div className="search">
          <div className="logo">
            <div className="logo-icon"></div>
            <h1>Spot Book</h1>
          </div>
          <div className="input-container">
            <input 
              type="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="main">
          <div className="spots">
            {this.state.spots.map((spot) => {
              return <Spot 
                key={spot.name} 
                spot={spot} 
                selectSpot={this.selectSpot}/>
            })}
          </div>

          
        </div>
        <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCA3QGmJR6uCJbmMXFJqn8cXmN3rd98hEs' }}
              center = {center}
              zoom = {zoom}
            >
            {this.state.spots.map((spot) => {
              return <Marker 
                lat={spot.lat} 
                lng={spot.lng} 
                text={spot.type} 
                spotType={spot.type} 
                selected = {spot === this.state.selectedSpot}/>
            })}
            </GoogleMapReact>
          </div>
      </div>
    )
  }
}

export default App;
