import React from 'react';
import './spot.css';

class Spot extends React.Component {
    handleClick = () => {
        this.props.selectSpot(this.props.spot);
    }
    render() {
        const title = this.props.spot.name ;
        const city = this.props.spot.city;
        const type =this.props.spot.type;

        const cityStyle = {
            fontSize: '12',
            fontWeight: 'lighter'
        }
        const style = {
            backgroundImage: `url('${this.props.spot.imageUrl}')`
        };

        return(
            <div className="spot" onClick={this.handleClick}>
                <div className="spot-picture" style={style}></div>
                <div className="spot-title">
                    <div className= {`spot-type ${type}`}></div>
                    <div className="spot-title-city">
                        <h2>{title}</h2>
                        <h4>{city}</h4>
                    </div>
                </div>
                 <div className="spot-about">
                    <p>{this.props.spot.about}</p>
                 </div>
                 <div className="spot-metro">
                    <small>{this.props.spot.metro}</small>
                 </div>
            </div>
        );
    }
}

export default Spot;