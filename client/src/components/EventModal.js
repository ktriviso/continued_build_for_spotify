import React, { Component } from 'react';
import './eventModal.css';

export default class EventModal extends Component {

  constructor(props){
    super(props)
    this.state={
      name: '',
      description: '',
      start: '',
      end: ''
    }
  }

  createEvent = (e) => {
    e.preventDefault()
        // e.preventDefault();
        // fetch('/auth/register', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         'username': this.state.username,
        //         'password': this.state.password,
        //     })
        // })
        // .then(() => {
        //     this.props.history.push(`/login`)
        // });
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
    const { onClose, formattedDate } = this.props;


    return (
      <div className='EventModal'>
        {formattedDate}
        <button onClick={onClose}>X</button>
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
          <button type="submit" onClick={onClose}>Save Event</button>

        </form>
      </div>
    );
  }
}
