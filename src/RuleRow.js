import React, { Component } from 'react';
import './RuleRow.css'

class RuleRow extends Component {
  constructor(props){
    super(props);
    this.handleRuleClick = this.handleRuleClick.bind(this);
  }

  handleRuleClick = e => {
    console.log('inside handle rule click current score: ',this.props.score);
    if(this.props.score !== undefined) return;
    this.props.doScore(this.props.name,`${this.props.name}.evalRoll`);

  }

  render() {
    return (
      <tr className={`RuleRow RuleRow-${!this.props.score ? 'active': 'disabled' }`} onClick={this.handleRuleClick} >
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{this.props.score}</td>
      </tr>
    )
  }
}

export default RuleRow;