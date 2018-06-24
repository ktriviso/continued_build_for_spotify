import React, { Component } from 'react';
import './createEvent.css';

export default class CreateEvent extends Component {

  constructor(props){
    super(props)
    this.state={
      name: '',
      description: '',
      start: '',
      end: '',
      date: this.props.currentDay
    }
    this.createEvent = this.createEvent.bind(this)
  }

  createEvent = (e) => {
    e.preventDefault()
    fetch('api', {
        method: 'POST',
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

  render() {
    const { formattedDate } = this.props;

    return (
      <div className='formModal'>
        {formattedDate}
        <form onSubmit={this.createEvent}>
          <input name="name" type="text" placeholder="name"
          onChange={this.name}/>
          <br/>
          <input name="description" type="text" placeholder="description"
          onChange={this.description}/>
          <br/>
          <input name="start" type="text" placeholder="start"
          onChange={this.start}/>
          <br/>
          <input name="end" type="text" placeholder="end"
          onChange={this.end}/>
          <br/>
          <button type="submit">Save Event</button>
        </form>
      </div>
    );
  }
}
