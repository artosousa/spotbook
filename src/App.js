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
      selectedSpot: null
    };
  }
  
  componentDidMount() {
    const url = "https://raw.githubusercontent.com/artosousa/spot-boilerplate/master/spots.json";
    fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.setState({
        spots: data
      });
    })
  }

  selectSpot = (spot) => {
    console.log(spot);
    this.setState({
      selectedSpot: spot
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
        <div className="main">
          <div className="search"></div>
          
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
