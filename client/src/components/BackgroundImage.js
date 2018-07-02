import React, { Component } from 'react';
import './css/backgroundImage.css'

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

  Images = () => {
    return (
      <div>
      {this.state.showImageMenu ? <div className="image-menu"></div> : null}
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
