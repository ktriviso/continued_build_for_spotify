import React, { Component } from 'react';
import Calendar from './components/Calendar'
import UserGreeting from './components/UserGreeting'
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      isUser: false
    }
  }

  myCallback = (data) => {
    this.setState({
      isUser: data
    })
  }

  render() {

    if(!this.state.isUser){
      return <UserGreeting callbackFromParent={this.myCallback} />
    } else {
      return (
        <div className="App">
          <Calendar />
        </div>
      );
    }
  }
}
