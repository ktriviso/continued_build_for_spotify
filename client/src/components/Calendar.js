import React, { Component } from 'react';
import moment from 'moment'
import CheckList from './CheckList'
import Day from './Day'
import './css/calendar.css';

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      formatDate: moment(),
      weekdays: moment.weekdays(),
      weekdaysShort: moment.weekdaysShort(),
      months: moment.months(),
      showMonthList: false
    }
  }

  componentDidMount(){
    const user = localStorage.getItem('user')
    this.setState({
      user: user
    })

    fetch(`api`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
          eventsFromDatabase: data
      })
    })
    .catch((err) => console.log(err))
  }

  getCurrentYear = () => {
    return this.state.formatDate.format('Y')
  }

  getCurrentMonth = () => {
    return this.state.formatDate.format('MMMM')
  }

  getDaysInMonth = () => {
    return this.state.formatDate.daysInMonth()
  }

  getCurrentDate = () => {
    return this.state.formatDate.get('date')
  }

  getCurrentDay  = () => {
    return this.state.formatDate.get('D')
  }

  firstDayOfMonth = () => {
    let date = this.state.formatDate
    let firstDay = moment(date).startOf('month').format('d')
    return firstDay
  }

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <a href="#" onClick={(e) => {this.changeMonth(e, data)}}>
          {data}
          </a>
        </div>
      )
    })

    return (
      <div className="month-dropdown">
      {popup}
      </div>
    )
  }

  setMonth = (month) => {
    // needed help for the moment.js current month update
    // https://www.youtube.com/watch?v=5vYJO0zRfbQ
    let updatedMonth = this.state.months.indexOf(month)
    let formatDate = Object.assign({}, this.state.formatDate)
    formatDate = moment(formatDate).set("month", updatedMonth)
    this.setState({
      formatDate: formatDate
    })
  }

  changeMonth = (e, data) => {
    e.preventDefault()
    this.setMonth(data)
  }

  showMonths = () => {
    this.setState({
      showMonthList: !this.state.showMonthList
    })
  }

  MonthNav = () => {
    return (
      <span onClick={this.showMonths}>
      {this.getCurrentMonth()}
      {this.state.showMonthList ? <this.SelectList data={this.state.months} /> : null}
      </span>
    )
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
      let className = i === this.getCurrentDay() ? 'day current-day' : 'day'
      if(this.state.eventsFromDatabase){
        let dayEvents = this.state.eventsFromDatabase.filter((eve) => {
          return (eve.event_date === i && eve.event_month === this.getCurrentMonth())
        })
        daysInMonth.push(
          <Day className={className} key={i} index={i} appendForm={this.appendForm} eventsFromDatabase={dayEvents} currentMonth={this.getCurrentMonth()}/>
        )
      } else {
        daysInMonth.push(
          <Day className={className} key={i} index={i} appendForm={this.appendForm} eventsFromDatabase={null} currentMonth={this.getCurrentMonth()}/>
        )
      }
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

    return (
      <div>

      <h1 id="user">Welcome {this.state.user ? this.state.user : null}</h1>

      <div className='calendar-container'>
        <table className='calendar'>
          <thead>
            <tr className='calendar-header'>
              <td colSpan='7'>
                <this.MonthNav />
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

      <CheckList />

      </div>
    );
  }
}

// {this.getCurrentMonth()}
