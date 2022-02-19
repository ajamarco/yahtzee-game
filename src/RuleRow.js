import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  constructor(props){
    super(props);
    this.handleRuleClick = this.handleRuleClick.bind(this);
  }

  handleRuleClick = e => {
    if(this.props.score !== undefined) return;
    this.props.doScore(this.props.name,`${this.props.name}.evalRoll`);

  }

  render() {
    const {description} = this.props;
    
    //save the score props into a variable. If score is undefined, that means this row hasn't been clicked and it is still active. if score has something - even 0 - this means that this row cannot be clicked anymore
    const active = this.props.score === undefined ? true : false;
    return (
      <tr className={`RuleRow RuleRow-${active ? 'active': 'disabled' }`} onClick={this.handleRuleClick} >
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{!active ? this.props.score : description}</td>
      </tr>
    )
  }
}

export default RuleRow;