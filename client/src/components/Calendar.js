import React, { Component } from 'react';
import moment from 'moment'
import SideBar from './SideBar'
import BackgroundImage from './BackgroundImage'
import Day from './Day'
import './css/calendar.css';

import Clouds from '../calendar-images/clouds.jpg'
import City from '../calendar-images/city.jpg'
import Color from '../calendar-images/color-blur.jpg'
import Fog from '../calendar-images/fog.jpg'
import Jellyfish from '../calendar-images/jellyfish.jpg'
import Leaves from '../calendar-images/leaves.jpg'
import Mountains from '../calendar-images/mountains.jpg'
import Sunrise from '../calendar-images/sunrise.jpg'
import Water from '../calendar-images/water.jpg'

export default class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      formatDate: moment(),
      weekdays: moment.weekdays(),
      weekdaysShort: moment.weekdaysShort(),
      months: moment.months(),
      showMonthList: false,
      updateFormInSideBar: false
    }
  }

  componentDidMount(){
    const user = localStorage.getItem('user')
    this.setState({
      user: user
    })
    this.getEventsFromDatabase()

    const root = document.getElementById('root')
    root.style.backgroundColor = 'Black'
  }

  getEventsFromDatabase = () => {
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

  lastDayOfMonth = () => {
    let date = this.state.formatDate
    let lastDay = moment(date).endOf('month').format('d')
    return lastDay
  }

  SelectList = (props) => {
    let popup = props.data.map((data) => {
      return (
        <div key={data}>
          <button onClick={(e) => {this.changeMonth(e, data)}}>
          {data}
          </button>
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
      <h3 className="month" onClick={this.showMonths}>
      {this.getCurrentMonth()}
      {this.state.showMonthList ? <this.SelectList data={this.state.months} /> : null}
      </h3>
    )
  }

  shouldUpdate = (newEventAdded) => {
    if(newEventAdded){
      this.getEventsFromDatabase()
    }
  }

  passCurrentEventOnClick = (eve) => {
    this.setState({
      passCurrentEventOnClick : eve
    })
  }

  selectNewBackground = (img) => {
    const root = document.getElementById('root')
    let backgroundImage
    // theres probably a better way to do this
    if(img === Clouds){
      backgroundImage = Clouds
    } else if (img === City){
      backgroundImage = City
    } else if (img === Color){
      backgroundImage = Color
    } else if (img === Fog){
      backgroundImage = Fog
    } else if (img === Jellyfish){
      backgroundImage = Jellyfish
    } else if (img === Leaves) {
      backgroundImage = Leaves
    } else if (img === Mountains){
      backgroundImage = Mountains
    } else if (img === Sunrise){
      backgroundImage = Sunrise
    } else if (img === Water){
      backgroundImage = Water
    }
    root.style.backgroundImage = `url(${backgroundImage})`
  }

  render() {

    // how many blanks to leave in the begining of the month
    let blanks = []
    for(let i = 0; i < this.firstDayOfMonth(); i++){
      blanks.push(
        <td key={i*50} className='emptySlot'>
          {''}
        </td>
      )
    }
    // how many blanks to leave in the end of the month
    let endBlanks = []
    for(let j = this.lastDayOfMonth(); j < 7; j++){
      endBlanks.push(
        <td key={j*90+1} className='emptySlot'>
          {''}
        </td>
      )
    }

    let daysInMonth = []
    for(let i = 1; i < this.getDaysInMonth(); i++){
      // highlights the current date for day and month
      let className = (i === this.getCurrentDay() && (moment().format('MMMM') === this.getCurrentMonth()))? 'day current-day' : 'day'
      if(this.state.eventsFromDatabase){
        let dayEvents = this.state.eventsFromDatabase.filter((eve) => {
          return (eve.event_date === i && eve.event_month === this.getCurrentMonth())
        })
        daysInMonth.push(
          <Day className={className} key={i} index={i} eventsFromDatabase={dayEvents} shouldUpdate={this.shouldUpdate} currentMonth={this.getCurrentMonth()} passCurrentEventOnClick={this.passCurrentEventOnClick} />
        )
      } else {
        daysInMonth.push(
          <Day className={className} key={i} index={i} eventsFromDatabase={null}
          shouldUpdate={this.shouldUpdate} currentMonth={this.getCurrentMonth()} passCurrentEventOnClick={this.passCurrentEventOnClick} />
        )
      }
    }

    let weekdays = this.state.weekdaysShort.map((day) => {
      return (
        <td key={day}>{day}</td>
      )
    })

    const totalSlots = [...blanks, ...daysInMonth, ...endBlanks]
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
      <div id="root" style={{backgroundImage: this.selectNewBackground}}>

      <SideBar eventsFromDatabase={this.state.eventsFromDatabase} getCurrentDay={this.getCurrentDay()} passCurrentEventOnClick={this.state.passCurrentEventOnClick ? this.state.passCurrentEventOnClick : null} shouldUpdate={this.shouldUpdate} getCurrentMonth={this.getCurrentMonth()} clearSideBar={this.state.clearSideBar} updateFormInSideBar={this.state.updateFormInSideBar}/>

      <div id="container">

      <header>
        <h1 onClick={this.passToSideBar}>Welcome {this.state.user ? this.state.user : Clouds}</h1>
        <BackgroundImage selectNewBackground={this.selectNewBackground}/>
      </header>

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
      </div>

      </div>
    );
  }
}
