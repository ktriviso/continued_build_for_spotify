import React, { Component } from 'react';
import moment from 'moment'
import EventModal from './EventModal'
import Day from './Day'
import './calendar.css';

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      weekdays: moment.weekdays(),
      weekdaysShort: moment.weekdaysShort(),
      months: moment.months(),
      isModalOpen: false
    }
  }

  getCurrentYear = () => {
    return moment().format('Y')
  }

  getCurrentMonth = () => {
    return moment().format('MMMM')
  }

  getDaysInMonth = () => {
    return moment().daysInMonth()
  }

  getCurrentDate = () => {
    return moment().get('date')
  }

  getCurrentDay  = () => {
    return moment().get('D')
  }

  firstDayOfMonth = () => {
    let date = moment()
    let firstDay = moment(date).startOf('month').format('d')
    return firstDay
  }

  openModal = () => {
    this.setState({ isModalOpen: true})
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  appendForm = (day) => {
    this.setState({
      currentDay: day
    })
    this.openModal()
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
      // console.log(this.getCurrentDay())
      console.log(this.getDaysInMonth())
      // console.log(i)
      let className = i === this.getCurrentDay() ? 'day current-day' : 'day'
      daysInMonth.push(
        <Day className={className} key={i} index={i} appendForm={this.appendForm}/>
      )
    }

    // will log how many spaces the month needs for valid dates
    // console.log("days: ", daysInMonth)

    let weekdays = this.state.weekdaysShort.map((day) => {
      return (
        <td key={day}>{day}</td>
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

    const conditionalModal = this.state.isModalOpen ?
    <EventModal
      currentDay={this.state.currentDay}
      onClose={this.closeModal}
      formattedDate={`${moment().format('MMMM')} ${this.state.currentDay}, ${moment().format('Y')}`}
    /> : null

    return (
      <div className='calendar-container'>
      {conditionalModal}
        <table className='calendar'>
          <thead>
            <tr className='calendar-header'>
              <td colSpan='7'>
                {this.getCurrentMonth()}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className='weekdays'>
              {weekdays}
            </tr>
            {elements}
          </tbody>
        </table>
      </div>
    );
  }
}
