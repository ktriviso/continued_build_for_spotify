import React, { Component } from 'react';

export default class Day extends Component {
  constructor(props){
    super(props)
    this.state = {
      day: this.props.index
    }
  }

  handleClick = () => {
    this.props.appendForm(this.state.day)
  }

  render() {
    return (
      <td key={this.props.index} className={this.props.className}>
        <span>{this.props.index}</span>
        <span onClick={this.handleClick}>+</span>
        <ul></ul>
      </td>
    );
  }
}
