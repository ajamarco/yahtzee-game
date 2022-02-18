import React, { Component } from "react";
import "./Die.css";

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
    const mapVal = [
      faDiceOne,
      faDiceTwo,
      faDiceThree,
      faDiceFour,
      faDiceFive,
      faDiceSix,
    ];
    const val = this.props.val || 1;
    console.log('rolling is ', this.props.rolling)
    let classes = "Die fa-5x "
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
