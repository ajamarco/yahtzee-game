import React, { Component } from "react";
import Die from "./Die";
import "./Dice.css";


//component that will render all the die components
class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        {/* we map trhough props.dice, for each die we create a Die component, passing some parameters*/}
        {this.props.dice.map((d, idx) => (
          <Die
            //handle click callback. This will be responsible to lock/unlock the die
            handleClick={this.props.handleClick}
            //the current value of the die (1,2,3,4,5,6) 
            val={d}
            //the current locked condition. Since locked is an array, we will just return the corresponding value of the current die. EG: if index is 0, we will just return locked[0] 
            locked={this.props.locked[idx]}
            //idx and key will be the current index of the current die value
            idx={idx}
            key={idx}
            //the disable property will be true if props.disabled == 0, otherwise will be false. props.disabled are how many rolls we have left. If we don't have any more rolls left, all the Die components will have disable=true
            disabled={this.props.disabled == 0}

            //rolling will have the same logic as the 'locked' property
            rolling={this.props.rolling[idx]}
          />
        ))}
      </div>
    );
  }
}

export default Dice;
