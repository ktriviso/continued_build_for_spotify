import React, { Component } from 'react';
import './css/viewEvent.css';

export default class ViewEvent extends Component {

  constructor(props){
    super(props)
    this.state={
      name: '',
      description: '',
      start: '',
      end: ''
    }
  }

  componentDidMount(){
    this.setState({
      currentEvent: this.props.currentEvent
    })

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

  isValid = (start, end) => {
    return start < end
  }

  updateEvent = (e) => {
    e.preventDefault();
    this.isValid(this.state.start, this.state.end) ?
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
    .then(res => console.log(res))
    .catch(err => console.log(err))
    : alert('invalid time')
    this.props.onClose()
  }

  removeEvent = () => {
    fetch(`api/${this.state.currentEvent.event_id}`, {
      method: 'DELETE'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    this.props.onClose()
  }

  name = (e) => {
    // i really wanted this to work but didnt
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ name: e.target.value })
  }

  description = (e) => {
    // i really wanted this to work but didnt
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ description: e.target.value })
  }

  start = (e) => {
    // i really wanted this to work but didnt
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ start: e.target.value })
  }

  end = (e) => {
    // i really wanted this to work but didnt
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ end: e.target.value })
  }

  render() {
    const { onClose } = this.props
    const option = this.state.hours ? this.state.hours.map((hour, i) => <option value={hour} key={i}>{hour}</option>) : null

    return (
      <div className='viewEvent'>
      <i onClick={onClose} className="far fa-times-circle"></i>

      <h1>Your Event</h1>
      <p>Event: <b>{this.state.currentEvent ? this.state.currentEvent.event_name : null}</b></p>
      <p>Description: <b>{this.state.currentEvent ? this.state.currentEvent.event_description : null}</b></p>
      <p>Date: <b>{this.state.currentEvent ? this.state.currentEvent.event_date : null}</b></p>
      <p>Start Time: <b>{this.state.currentEvent ? this.state.currentEvent.start_time : null}</b></p>
      <p>End Time: <b>{this.state.currentEvent ? this.state.currentEvent.end_time : null}</b></p>

      <h3>Need to Update your event?</h3>
      <h4>Add your event information below and click the {<i className="fas fa-pencil-alt inline-icon"></i>} below.</h4>

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
        <button type="submit"><i className="fas fa-pencil-alt"></i></button>
      </form>

      <button><i onClick={this.removeEvent} className="far fa-trash-alt"></i></button>


      </div>
    );
  }
}
