import React, { Component } from 'react';
import './css/createEvent.css';

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
    this.props.onClose()
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
    const { formattedDate, onClose } = this.props;

    return (
      <div className='createEvent'>
      <i onClick={onClose} className="far fa-times-circle inline"></i>
      <h1>Your new event</h1>
      <h4>To add a new event to your calendar, add the event information and click on the <i className="far fa-save inline-icon"></i> below </h4>

        {formattedDate}
        <form onSubmit={this.createEvent}>
          <input name="name" type="text" placeholder="name"
          onChange={this.name}/>
          <br/>
          <input name="description" type="text" placeholder="description"
          onChange={this.description}/>
          <br/>
          <input name="end" type="text" placeholder="end"
          onChange={this.start}/>
          <br/>
          <input name="end" type="text" placeholder="end"
          onChange={this.end}/>
          <br/>
          <button type="submit"><i className="far fa-save"></i></button>
        </form>

      </div>
    );
  }
}
