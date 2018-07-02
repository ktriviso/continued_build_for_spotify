import React, { Component } from 'react';
import './css/userGreeting.css';

export default class UserGreeting extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  name = (e) => {
    this.setState({ name: e.target.value })
  }

  addUser = (e) => {
    e.preventDefault()
    localStorage.setItem('user', this.state.name)
    this.props.history.push(`/calendar`)
  }

  render() {

    return (
      <div className="userGreeting">
      <h1>Please enter your name below to open your calendar</h1>
        <form onSubmit={this.addUser}>
          <input name="name" type="text" placeholder="name"
          onChange={this.name}/>
          <button type="submit"><i className="fas fa-arrow-right"></i></button>
        </form>

        <p>Krista Triviso<br/><a href="http://www.kristatriviso.com">www.kristatriviso.com</a></p>
      </div>
    );
  }
}
