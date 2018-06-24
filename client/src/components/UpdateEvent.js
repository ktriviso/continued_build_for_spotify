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

  componentDidMount(){
    this.setState({
      currentEvent: this.props.currentEvent
    })
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
        'event_date': this.props.currentEvent.event_id
      })
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  removeEvent = () => {
    fetch(`api/${this.state.currentEvent.event_id}`, {
      method: 'DELETE'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  name = (e) => {
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ name: e.target.value })
  }

  description = (e) => {
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ description: e.target.value })
  }

  start = (e) => {
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ start: e.target.value })
  }

  end = (e) => {
    // const value = e.target.value ? e.target.value : e.target.getAttribute('placeholder')
    this.setState({ end: e.target.value })
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
      <button onClick={this.removeEvent}>Trash</button>
      </div>
    );
  }
}
