import React, { Component } from 'react';
import Calendar from './components/Calendar'
import UserGreeting from './components/UserGreeting'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

    return (
      <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/calendar' component={Calendar} />
          <Route exact path='/' component={UserGreeting} />
        </Switch>
      </div>
      </BrowserRouter>
    )
  }
}
