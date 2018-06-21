import React, { Component } from 'react';
import moment from 'moment'
import './calendar.css';

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: moment(),
      weekdays: moment.weekdays(),
      weekdaysShort: moment.weekdaysShort(),
      months: moment.months()
    }
  }

  getCurrentYear = () => {
    return this.state.date.format('Y')
  }

  getCurrentMonth = () => {
    return this.state.date.format('MMMM')
  }

  getDaysInMonth = () => {
    return this.state.date.daysInMonth()
  }

  getCurrentDate = () => {
    return this.state.date.get('date')
  }

  getCurrentDay  = () => {
    return this.state.date.get('D')
  }

  firstDayOfMonth = () => {
    let date = this.state.date
    let firstDay = moment(date).startOf('month').format('d')
    return firstDay
  }

  render() {

    // key is i * 50 because there was a key duplication error
    let blanks = []
    for(let i = 0; i < this.firstDayOfMonth(); i++){
      blanks.push(
        <td key={i*50} className='emptySlot'>
          {''}
        </td>
      )
    }

    // will log how many blank spaces the month needs to start with
    // console.log('blanks:', blanks)

    let daysInMonth = []
    for(let i = 1; i < this.getDaysInMonth(); i++){
      let className = (i === this.getCurrentDay() ? 'day current-day' : 'day')
      daysInMonth.push(
        <td key={i} className={className}>
          <span>{i}</span>
        </td>
      )
    }

    // will log how many spaces the month needs for valid dates
    // console.log("days: ", daysInMonth)

    let weekdays = this.state.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">{day}</td>
      )
    })

    const totalSlots = [...blanks, ...daysInMonth]
    let rows = []
    let cells = []

    // you need to break the totalSlots into rows of 7, so filter by index
    totalSlots.forEach((row, i) => {
      if(i % 7 !== 0){
        cells.push(row)
      } else {
        let newRow = cells.slice()
        rows.push(newRow)
        cells = []
        cells.push(row)
      }

      if(i === totalSlots.length -1){
        let newRow = cells.slice()
        rows.push(newRow)
      }
    })

    let elements = rows.map((elem, i) => {
      return (
        <tr key={i}>
          {elem}
        </tr>
      )
    })

    return (
      <div className='calendar-container'>
        <table className='calendar'>
          <thead>
            <tr className='calendar-header'>
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekdays}
            </tr>
            {elements}
          </tbody>
        </table>
      </div>
    );
  }
}
