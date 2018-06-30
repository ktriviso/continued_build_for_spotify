import React, { Component } from 'react';
import './css/sideBar.css';

export default class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div className="sideBar">
        <div id="day-view">day view</div>
        <div id="event-view">event view</div>
        <div id="event-list">list of events</div>
        <div id="spotify">
          <p>Sign into Spotify <i className="fab fa-spotify"></i></p>
          <ul>
            <li><i className="fas fa-backward"></i></li>
            <li><i className="fas fa-stop"></i></li>
            <li><i className="fas fa-play"></i></li>
            <li><i className="fas fa-pause"></i></li>
            <li><i className="fas fa-forward"></i></li>
          </ul>
        </div>
      </div>
    )
  }
}
