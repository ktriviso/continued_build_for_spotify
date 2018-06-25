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
    this.props.onClose()
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
      <div className='viewEvent'>
      <i onClick={onClose} className="far fa-times-circle"></i>

      <h1>Your Event</h1>
      <p>Event: {this.state.currentEvent ? this.state.currentEvent.event_name : null}</p>
      <p>Description: {this.state.currentEvent ? this.state.currentEvent.event_description : null}</p>
      <p>Date: {this.state.currentEvent ? this.state.currentEvent.event_date : null}</p>
      <p>Time: {this.state.currentEvent ? this.state.currentEvent.start_time : null} - {this.state.currentEvent ? this.state.currentEvent.end_time : null}</p>

      <h3>Need to Update your event?</h3>
      <h4>Add your event information below and click the {<i className="fas fa-pencil-alt inline-icon"></i>} below.</h4>

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
        <button type="submit"><i className="fas fa-pencil-alt"></i></button><button><i onClick={this.removeEvent} className="far fa-trash-alt"></i></button>
      </form>


      </div>
    );
  }
}