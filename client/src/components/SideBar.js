import React, { Component } from 'react';
import './css/sideBar.css';

export default class SideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      getCurrentEvents: [],
      passCurrentEventOnClick: null,
      name: '',
      description: '',
      start: '',
      end: '',
      viewEventForm: false
    }
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.eventsFromDatabase){
      const arr = []
      nextProps.eventsFromDatabase.map((eve) => {
        eve.event_date === nextProps.getCurrentDay ? arr.push(eve) : null
      })
      this.setState({
        getCurrentEvents: arr,
        passCurrentEventOnClick: nextProps.passCurrentEventOnClick
      })
    }
  }

  componentDidMount(){
    let hoursArray = []

    for(let i = 0; i <= 12; i ++){
      hoursArray.push(`00${i}`)
    }
    for(let j = 12; j <= 24; j ++){
      hoursArray.push(`${j}00`)
    }

    this.setState({
      hours: hoursArray
    })
  }

  shouldUpdate = (eventAdded) => {
    this.props.shouldUpdate(eventAdded)
  }

  updateEvent = (e) => {
    e.preventDefault();
    fetch(`api/${this.state.currentEvent.event_id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'event_name': this.state.name,
        'event_description': this.state.description,
        'start_time': this.state.start,
        'end_time': this.state.end
      })
    })
    .then(res => {
      console.log(res)
      if(res.status === 200) {
        this.props.shouldUpdate(true)
      }
    })
    .catch(err => {
      console.log(err)
      this.props.shouldUpdate(false)
    })
  }

  removeEvent = () => {
    fetch(`api/${this.state.passCurrentEventOnClick.event_id}`, {
      method: 'DELETE'
    })
    .then(res => {
      console.log(res)
      if(res.status === 200) {
        this.props.onClose()
        this.shouldUpdate(true)
      }
    })
    .catch(err => {
      console.log(err)
      this.shouldUpdate(false)
    })
  }

  changeForm = () => {
    this.setState({
      viewEventForm: true
    })
  }

  viewEventForm = () => {
    return (
      <div id="event-view">
        <li>
          {this.state.passCurrentEventOnClick ? `Name: ${this.state.passCurrentEventOnClick.event_name}` : null}
        </li>
        <li>
          {this.state.passCurrentEventOnClick ? `Date: ${this.state.passCurrentEventOnClick.event_month}  ${this.state.passCurrentEventOnClick.event_date}, 2018` : null}
        </li>
        <li>
          {this.state.passCurrentEventOnClick ? `Description: ${this.state.passCurrentEventOnClick.event_description}` : null}
        </li>
        <li>
          {this.state.passCurrentEventOnClick ? `Start Time: ${this.state.passCurrentEventOnClick.start_time}` : null}
        </li>
        <li>
          {this.state.passCurrentEventOnClick ? `End Time: ${this.state.passCurrentEventOnClick.end_time}` : null}
        </li>
        <li className="icon-edit" onClick={this.changeForm}>
          {this.state.passCurrentEventOnClick ? <i className="fas fa-pencil-alt inline-icon"></i> : null}
        </li>
        <li className="icon-edit">
          {this.state.passCurrentEventOnClick ? <i onClick={this.removeEvent} className="far fa-trash-alt"></i> : null}
        </li>
      </div>
    )
  }

  editEventForm = () => {
    const option = this.state.hours ? this.state.hours.map((hour, i) => <option value={hour} key={i}>{hour}</option>) : null
    return (
      <form onSubmit={this.updateEvent}>
        <input name="name" type="text" placeholder={this.state.currentEvent ? this.state.currentEvent.event_name : null}
        onChange={this.name}/>
        <br/>
        <input name="description" type="text" placeholder={this.state.currentEvent ? this.state.currentEvent.event_description : null}
        onChange={this.description}/>
        <br/>
        <select value={this.state.start} onChange={this.start}>
          {option}
        </select>
        <br/>
        <select value={this.state.end} onChange={this.end}>
          {option}
        </select>
        <br/>
        <button type="submit">update</button>
        <button onClick={this.closeEditForm}>close</button>
      </form>
    )
  }

  name = (e) => {
    this.setState({ name: e.target.value })
  }

  description = (e) => {
    this.setState({ description: e.target.value })
  }

  start = (e) => {
    this.setState({ start: e.target.value })
  }

  end = (e) => {
    this.setState({ end: e.target.value })
  }

  closeEditForm = () => {
    this.setState({
      viewEventForm: false
    })
  }

  render(){
    
    const viewEventForm = !this.state.viewEventForm ? <this.viewEventForm /> : null
    const editEventForm = this.state.viewEventForm ? <this.editEventForm /> : null

    const events = this.props.eventsFromDatabase ? this.props.eventsFromDatabase.map((eve, i) => {
      return <li key={i} event_id={eve.event_id}>{eve.event_name}</li>
    }) : null

    const day_events = this.state.getCurrentEvents ? this.state.getCurrentEvents.map((eve, i) => {
      return <li key={i}>{`${eve.event_name} at ${eve.start_time}`}</li>
    }) : null

    return (

      <div className="sideBar">
        <p className="sideBarHeader">Your Daily Update</p>
        <div id="day-view">
          {day_events}
        </div>
        <div className="sideBarHeader">View A Selected Event</div>
        {viewEventForm}
        {editEventForm}
        <div className="sideBarHeader">Your Upcomming events</div>
        <div id="event-list">
          {events}
        </div>
      </div>
    )
  }
}
