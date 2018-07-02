import React, { Component } from 'react';
import './css/sideBar.css';

export default class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      getCurrentEvents: []
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.eventsFromDatabase){
      const arr = []
      nextProps.eventsFromDatabase.map((eve) => {
        eve.event_date === nextProps.getCurrentDay ? arr.push(eve.event_name) : null
      })
      this.setState({
        getCurrentEvents: arr,
        passCurrentEventOnClick: nextProps.passCurrentEventOnClick
      })
    }
  }

  render(){

    const events = this.props.eventsFromDatabase ? this.props.eventsFromDatabase.map((eve, i) => {
      return <li className="event-sidebar-list" key={i} event_id={eve.event_id}>{eve.event_name}</li>
    }) : null

    const day_events = this.state.getCurrentEvents ? this.state.getCurrentEvents.map((eve, i) => {
      return <li className="event-sidebar-list" key={i}>{eve}</li>
    }) : null

    return (
      <div className="sideBar">
        <p className="sideBarHeader">Your Daily Update</p>
        <div id="day-view">
          {day_events}
        </div>
        <div id="event-view">
          <li className="event-sidebar-list">
            {this.state.passCurrentEventOnClick ? this.state.passCurrentEventOnClick.event_id : null}
          </li>
          <li className="event-sidebar-list">
            {this.state.passCurrentEventOnClick ? this.state.passCurrentEventOnClick.event_name : null}
          </li>
          <li className="event-sidebar-list">
            {this.state.passCurrentEventOnClick ? this.state.passCurrentEventOnClick.event_description : null}
          </li>
          <li className="event-sidebar-list">
            {this.state.passCurrentEventOnClick ? this.state.passCurrentEventOnClick.start_time : null}
          </li>
          <li className="event-sidebar-list">
            {this.state.passCurrentEventOnClick ? this.state.passCurrentEventOnClick.end_time : null}
          </li>
        </div>
        <div className="sideBarHeader">Your Upcomming events</div>
        <div id="event-list">
          {events}
        </div>
        <p className="sideBarHeader">Sign into Spotify <i className="fab fa-spotify"></i></p>
        <div id="spotify">
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
