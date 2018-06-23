import React, { Component } from 'react';

export default class Day extends Component {
  constructor(props){
    super(props)
    this.state = {
      day: this.props.index
    }
  }

  componentDidMount(){
    console.log(this.props)
  }

  handleClick = () => {
    this.props.appendForm(this.state)
  }

  render() {

    return (
      <td key={this.props.index} className={this.props.className} onClick={this.handleClick}>
        <span>{this.props.index}</span>
        <ul></ul>
      </td>
    );
  }
}
