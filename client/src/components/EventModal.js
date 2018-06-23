import React, { Component } from 'react';
import './eventModal.css';

export default class EventModal extends Component {

  render() {
    const { onClose } = this.props;
    return (
      <div className='EventModal'>
        <button onClick={onClose}>close</button>

        <p>Hello! I am a modal.</p>
      </div>
    );
  }
}
