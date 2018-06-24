import React, { Component } from 'react';
import UpdateEvent from './UpdateEvent'
import CreateEvent from './CreateEvent'
import './day.css';

export default class Day extends Component {
  constructor(props){
    super(props)
    this.state = {
      day: this.props.index,
      isCreateEventOpen: false,
      isUpdateEventOpen: false
    }
  }

  createEvent = (e) => {
    e.preventDefault()
    this.setState({ isCreateEventOpen: true})
  }

  viewEvent = (e) => {
    e.preventDefault()
    let targetEvent = this.state.calendar_event.find((eve) => {
      // radix err: set the defualt to 8 https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter-what-should-i-do
      if(parseInt(e.target.getAttribute('event_id'), 8) === eve.event_id){
        return eve
      }
      return null
    })
    this.setState({
      currentEvent: targetEvent
    })
    this.openUpdateEvent()
  }

  openUpdateEvent = () => {
    this.setState({ isUpdateEventOpen: true})
  }

  closeUpdateEvent = () => {
    this.setState({ isUpdateEventOpen: false })
  }

  closeCreateEvent = () => {
    this.setState({ isCreateEventOpen: false })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.eventsFromDatabase !== undefined){
      this.setState({
        calendar_event : nextProps.eventsFromDatabase
      })
    }
  }

  render() {

    const conditionalUpdateEvent = this.state.isUpdateEventOpen ?
    <UpdateEvent
      onClose={this.closeUpdateEvent}
      currentEvent={this.state.currentEvent}
    /> : null

    const conditionalCreateEvent = this.state.isCreateEventOpen ?
    <CreateEvent
      onClose={this.closeCreateEvent}
      currentDay={this.state.day}
    /> : null

    const scroll = this.state.calendar_event && this.state.calendar_event.length > 2 ? <span className="icon"><i className="fas fa-arrow-down"></i></span> : null

    const calendar_event = this.state.calendar_event ? this.state.calendar_event.map((eve, i) => {
      return <li key={eve.event_id} event_id={eve.event_id} onClick={this.viewEvent}>{eve.event_name}</li>
    }) : null

    return (
      <td key={this.props.index} className={this.props.className}>
        {conditionalCreateEvent}
        {conditionalUpdateEvent}
        <span>{this.props.index}</span>
        <ul>{calendar_event}</ul>
        {scroll}
        <span onClick={this.createEvent}>+</span>
      </td>
    );
  }
}
