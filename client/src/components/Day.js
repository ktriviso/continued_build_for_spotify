import React, { Component } from 'react';
import CreateEvent from './CreateEvent'
import './css/day.css';

export default class Day extends Component {
  constructor(props){
    super(props)
    this.state = {
      day: this.props.index,
      isCreateEventOpen: false,
      updateComp: false
    }
  }

  createEvent = (e) => {
    e.preventDefault()
    this.setState({ isCreateEventOpen: true})
  }

  viewEvent = (e) => {
    e.preventDefault()
    this.state.calendar_event.find((eve) => {
      // radix err: set the defualt to 10 https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter-what-should-i-do
      if(parseInt(e.target.getAttribute('event_id'), 10) === eve.event_id){
        this.props.passCurrentEventOnClick(eve)
      }
    })

  }

  closeCreateEvent = () => {
    this.setState({ isCreateEventOpen: false })
  }

  componentWillMount(){
    this.setState({
      calendar_event : this.props.eventsFromDatabase
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.eventsFromDatabase !== undefined){
      this.setState({
        calendar_event : nextProps.eventsFromDatabase
      })
    }
  }

  shouldUpdate = (eventAdded) => {
    this.props.shouldUpdate(eventAdded)
  }

  render() {

    const conditionalCreateEvent = this.state.isCreateEventOpen ?
    <CreateEvent
      onClose={this.closeCreateEvent}
      currentDay={this.state.day}
      currentMonth={this.props.currentMonth}
      shouldUpdate={this.shouldUpdate}
    /> : null

    const scroll = this.state.calendar_event && this.state.calendar_event.length > 2 ? <span className="icon"><i className="fas fa-arrow-down icon-small"></i></span> : null

    const calendar_event = this.state.calendar_event ? this.state.calendar_event.map((eve, i) => {
      return <li className="day-listitem day-li" key={eve.event_id} event_id={eve.event_id} onClick={this.viewEvent}>{eve.event_name}</li>
    }) : null

    return (
      <td key={this.props.index} className={this.props.className}>
        {conditionalCreateEvent}
        <span>{this.props.index}</span>
        <ul className="day-ul">
          {calendar_event}
        </ul>
        {scroll}
        <span onClick={this.createEvent}><i className="fas fa-plus icon-small"></i></span>
      </td>
    );
  }
}
