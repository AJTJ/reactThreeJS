import React from 'react';

class Controls extends React.Component {

   render() {

      let shapeColor = {
         color: this.props.color
      }
      let lightsColor = {
         color: this.props.lightsColor
      }

      return (
         <form className={`controlsForm ${this.props.controlsHidden ? 'controlsHidden' : ''}`} action="">

            <h3>react and three.js experiment</h3>

            <div className="sliderDiv">
               <div className="labelDiv"><label className="sliderLabel">Shape Size</label></div>
               <input onChange={this.props.sizeChange} className="slider" type="range" min="1" max="10" value={this.props.sizeValue} />
            </div>

            <div className="sliderDiv">
               <div className="labelDiv"><label className="sliderLabel">Shape Vertices</label></div>
               <input onChange={this.props.verticesChange} className="slider" type="range" min="0" max="5" value={this.props.vertices} />
            </div>

            <div className="colorButtonDiv">
               <input onClick={this.props.getRandomColor} className="randomColorButton" type="button" value="Change SHAPE color"/>
            </div>
            <p>Currently: <span style={shapeColor}>{this.props.color}</span></p>

            <div className="colorButtonDiv">
               <input onClick={this.props.getRandomLightsColor} className="randomColorButton" type="button" value="Change LIGHTS color"/>
            </div>
            <p>Currently: <span style={lightsColor}>{this.props.lightsColor}</span></p>

            <div className="nameSocials" >
               <span>by: Aaron Janke </span>
               <span className="socials">
                  <a href="aaronjanke.com" target="_blank"><i className="fas fa-mouse-pointer"></i></a>
                  <a href="https://twitter.com/aaronjanke" target="_blank"><i className="fab fa-twitter"></i></a>
               </span> 
            </div>
            
            <a onClick={this.props.toggleControls} className="showControlsButton" href="">
               <i className="fas fa-toggle-off fa-2x"></i>
            </a>

         </form>
      )
   }
};

export default Controls;