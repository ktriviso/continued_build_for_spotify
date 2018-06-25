import React, { Component } from 'react';
import './css/checkList.css'

export default class CheckList extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <div className="checkList">
        <ul>
          <li className="req">scroll HERE to view completed requirements <i className="fas fa-arrow-down bounce"></i></li>
          <li><i className="far fa-check-circle circle"></i>create a new event by clicking on plus icon on day</li>
          <li><i className="far fa-check-circle circle"></i>events are sent to the backend by clicking on save icon</li>
          <li><i className="far fa-check-circle circle"></i>form includes start time, end time, description, name, edit and submit</li>
          <li><i className="far fa-check-circle circle"></i>once submit is sent the form disappears</li>
          <li><i className="far fa-check-circle circle"></i>events appear in respective day’s box</li>
          <li><i className="far fa-check-circle circle"></i>events start and end the same day</li>
          <li><i className="far fa-check-circle circle"></i>calendar shows all events the user has created</li>
          <li><i className="far fa-check-circle circle"></i>UI appropriate amount of rows and boxes for specified month</li>
          <li><i className="far fa-check-circle circle"></i>application communicates with an API backend using JSON (fetch)</li>
          <li><i className="far fa-check-circle circle"></i>users can choose a month to display</li>
          <li><i className="far fa-check-circle circle"></i>UI displays modals for calendar view or single event view</li>
          <li><i className="far fa-check-circle circle"></i>UI handles multiple events on a given day (scroll capeability with icon)</li>
          <li><i className="far fa-check-circle circle"></i>update and delete functionality for events</li>
          <li><i className="far fa-check-circle circle"></i>UI has boxes and rows with the correct date (moment.js)</li>
          <li><i className="far fa-check-circle circle"></i>POST, GET, PUT, DELETE are succesfully integrated with backend</li>
          <li><i className="far fa-check-circle circle"></i>SQL database synced</li>
          <li><i className="far fa-check-circle circle"></i>user is greeted on entering application</li>
          <li><i className="far fa-check-circle circle"></i>Hosted on Heroku</li>
        </ul>
      </div>
    )
  }
}
