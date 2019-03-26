import React from "react";
import "./marker.css";

class Marker extends React.Component {
    render(){
        let classes = `marker ${this.props.spotType}`;
        
        if (this.props.selected) {
            classes += ' selected';
        }
        return (
            
            <div>
                <div className= {classes}></div>
                
            </div>
            
        );
    }
}

export default Marker;