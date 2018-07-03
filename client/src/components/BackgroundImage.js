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

  selectNewBackground = (e) => {
    const data = e.target.getAttribute('data')
    this.props.selectNewBackground(data)
  }

  Images = () => {
    return (
      <div>
      {this.state.showImageMenu ?
      <div className="image-menu">
        <img onClick={this.selectNewBackground} data={City} alt='' src={City}/>
        <img onClick={this.selectNewBackground} data={Clouds} alt='' src={Clouds}/>
        <img onClick={this.selectNewBackground} data={Color} alt='' src={Color}/>
        <img onClick={this.selectNewBackground} data={Fog} alt='' src={Fog}/>
        <img onClick={this.selectNewBackground} data={Jellyfish} alt='' src={Jellyfish}/>
        <img onClick={this.selectNewBackground} data={Leaves} alt='' src={Leaves}/>
        <img onClick={this.selectNewBackground} data={Mountains} alt='' src={Mountains}/>
        <img onClick={this.selectNewBackground} data={Sunrise} alt='' src={Sunrise}/>
        <img onClick={this.selectNewBackground} data={Water} alt='' src={Water}/>
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
