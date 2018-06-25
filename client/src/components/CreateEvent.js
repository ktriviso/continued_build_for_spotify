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
      date: this.props.currentDay,
      month: this.props.currentMonth
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
            'event_date': this.state.date,
            'event_month': this.state.month
        })
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
    this.props.onClose()
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
    const option = this.state.hours ? this.state.hours.map((hour, i) => <option value={hour} key={i}>{hour}</option>) : null

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
          <select value={this.state.start} onChange={this.start}>
            {option}
          </select>
          <br/>
          <select value={this.state.end} onChange={this.end}>
            {option}
          </select>
          <br/>
          <button type="submit"><i className="far fa-save"></i></button>
        </form>

      </div>
    );
  }
}
