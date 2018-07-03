import React, { Component } from 'react';
import './css/backgroundImage.css'

import City from '../calendar-images/city.jpg'
import Clouds from '../calendar-images/clouds.jpg'
import Color from '../calendar-images/color-blur.jpg'
import Fog from '../calendar-images/fog.jpg'
import Jellyfish from '../calendar-images/jellyfish.jpg'
import Leaves from '../calendar-images/leaves.jpg'
import Mountains from '../calendar-images/mountains.jpg'
import Sunrise from '../calendar-images/sunrise.jpg'
import Water from '../calendar-images/water.jpg'

export default class BackgroundImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      showImageMenu: false
    }
  }

  openImageMenu = () => {
    this.setState({
      showImageMenu: !this.state.showImageMenu
    })
  }

  selectNewBackground = () => {
    console.log('ive been clicked')
  }

  Images = () => {
    return (
      <div>
      {this.state.showImageMenu ?
      <div className="image-menu">
        <img onClick={this.selectNewBackground} alt='' src={City}/>
        <img onClick={this.selectNewBackground} alt='' src={Clouds}/>
        <img onClick={this.selectNewBackground} alt='' src={Color}/>
        <img onClick={this.selectNewBackground} alt='' src={Fog}/>
        <img onClick={this.selectNewBackground} alt='' src={Jellyfish}/>
        <img onClick={this.selectNewBackground} alt='' src={Leaves}/>
        <img onClick={this.selectNewBackground} alt='' src={Mountains}/>
        <img onClick={this.selectNewBackground} alt='' src={Sunrise}/>
        <img onClick={this.selectNewBackground} alt='' src={Water}/>
      </div> : null}
      </div>
    )
  }

  render(){
    return(
      <div className="backgroundImage">
        <i onClick={this.openImageMenu} className="far fa-image"></i>
        <this.Images />
      </div>
    )

  }
}
