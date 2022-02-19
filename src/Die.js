import React, { Component } from "react";
import "./Die.css";

//import FontAwesome library, as well the faces for each Die
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

class Die extends Component {
  render() {

    //create an array to map every die number to each element in the array
    const mapVal = [
      faDiceOne,
      faDiceTwo,
      faDiceThree,
      faDiceFour,
      faDiceFive,
      faDiceSix,
    ];

    //if props.val is valid return it, otherwise return 1, which will be the default value at the beginning. TODO create a defaultProps here
    const val = this.props.val || 1;
    
    //create a variable that will hold the default classes for the Die component
    let classes = "Die fa-5x "

    //if 
    classes = this.props.rolling ? `${classes} Die-rolling` : "Die fa-5x ";
    if(this.props.locked) classes = `${classes} Die-locked`;
    return (
      <FontAwesomeIcon
        icon={mapVal[val - 1]}
        className={classes}
        onClick={() => this.props.handleClick(this.props.idx)}
        
      />
    );
  }
}

export default Die;
