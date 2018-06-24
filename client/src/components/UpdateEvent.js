import React, { Component } from 'react';
import './updateEvent.css';

export default class UpdateEvent extends Component {

  constructor(props){
    super(props)
    this.state={
      name: '',
      description: '',
      start: '',
      end: ''
    }
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
        'end_time': this.state.end,
        'event_date': this.state.date
      })
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  name = (e) => {
    const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ name: value })
  }

  description = (e) => {
    const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ description: value })
  }

  start = (e) => {
    const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ start: value })
  }

  end = (e) => {
    const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ end: value })
  }

  componentDidMount(){
    this.setState({
      currentEvent: this.props.currentEvent
    })
  }

  render() {
    const { onClose } = this.props

    return (
      <div className='eventModal'>
      <form onSubmit={this.updateEvent}>
        <input name="name" type="text" placeholder={this.state.currentEvent ? this.state.currentEvent.event_name : null}
        onChange={this.name}/>
        <br/>
        <input name="description" type="text" placeholder={this.state.currentEvent ? this.state.currentEvent.event_description : null}
        onChange={this.description}/>
        <br/>
        <input name="start" type="text" placeholder={this.state.currentEvent ? this.state.currentEvent.event_description : null}
        onChange={this.start}/>
        <br/>
        <input name="end" type="text" placeholder={this.state.currentEvent ? this.state.currentEvent.event_description : null}
        onChange={this.end}/>
        <br/>
        <button type="submit">Update Event</button>
      </form>
      <button onClick={onClose}>X</button>
      </div>
    );
  }
}
