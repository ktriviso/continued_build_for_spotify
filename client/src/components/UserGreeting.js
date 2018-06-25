import React, { Component } from 'react';

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
    this.props.callbackFromParent(true)
  }

  render() {

    return (
      <div className="userGreeting">
      <h1>Welcome to The Spotify Internship Calendar Application</h1>
      <h4>Please enter your name below to open your calendar</h4>
        <form onSubmit={this.addUser}>
          <input name="name" type="text" placeholder="name"
          onChange={this.name}/>
          <br/>
          <button type="submit"><i className="far fa-save"></i></button>
        </form>
      </div>
    );
  }
}
