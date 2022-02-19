import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import "./Game.css";

//constants for the number of dices and the number of rolls
const NUM_DICE = 5;
const NUM_ROLLS = 3;

//the main component of the whole game. Contains all other components.
class Game extends Component {
  constructor(props) {
    super(props);
    //declare the state of the Game component
    this.state = {
      //dice will be an Array with the lenght equals to NUM_DICE const. All values are initiated with Undefined
      dice: Array.from({ length: NUM_DICE }),

      //locked will have an array with the length of NUM_DICE. Every element inside it will be false - that's what the fill() function does it
      locked: Array(NUM_DICE).fill(false),

      rollsLeft: NUM_ROLLS,

      //set rolling, which will be an array of false. This will only change if the user clicks to Reroll the dice and if the current die is not locked
      rolling: Array(NUM_DICE).fill(false),

      //all the scores will be initiated with undefined
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined,
      },
    };

    //binding the functions to 'this'
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  //============================================
  //function to roll the dice. Every die will have a random number between 1 and 6
  roll(evt) {

    this.setState((st) => ({
      //the dice state will have new values for every die. if a die is locked it will receive the same value - variable d
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      //if rolls left is bigger than one we return the same locked state - defined by st.locked. If not, we fill every element of locked with true
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      //update the rollsLeft state
      rollsLeft: st.rollsLeft - 1,

      //set Rolling to be true
      rolling: st.locked.map((d, i) => 
        !st.locked[i]
      )
    }));

    //after 1 second, set rolling to false. rolling will be used to stop the roll effect on the dice
    setTimeout(() => {
      this.setState((st) => ({rolling: Array(NUM_DICE).fill(false)}))
    }, 1000);
  }

  //=========================================
  //function that is activated when the user clicks in a given die. It will set the clicked die as locked
  toggleLocked(idx) {
    // if there are no more rollsLeft we don't change anything.
    if (this.state.rollsLeft === 0) return;

    //we create a copy of the current locked state and invert the value current stored in the [idx] index
    const newLocked = [...this.state.locked];
    newLocked[idx] = !newLocked[idx];

    //we set state.locked to be the newLocked variable
    this.setState((st) => ({
      locked: newLocked,
    }));
  }

  //=========================================
  //function that will be called when the user clicks on a given play at the score table. It will calculate if the user got it right or not.
  doScore(rulename, ruleFn) {
    // it will set the state of the object, reseting rollsLeft and locked, and updating scores
    this.setState((st) => ({
      //score will be updated based on the ruleName that has been passed as a parameter ('ones', 'twos', 'threes', etc) and the return of the function passed as an argument ruleFn. This function will get the values on the dice
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
    this.roll();
  }

  render() {
    //save a variable to tell if the Roll button will be disabled. it will be if every die is locked or if any of the dice is rolling
    const buttonDisabled = this.state.locked.every((x) => x) || this.state.rolling.includes(true);
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>
          <section className="Game-dice-section">
            <Dice
              dice={this.state.dice}
              locked={this.state.locked}
              handleClick={this.toggleLocked}
              disabled={this.state.rollsLeft}
              rolling={this.state.rolling}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={buttonDisabled}
                onClick={this.roll}
              >
                {this.state.rollsLeft} Rerolls Left
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </div>
    );
  }
}

export default Game;
