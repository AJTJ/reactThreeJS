import React from 'react';
import NumericInput from 'react-numeric-input';

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

            <h1>react and three.js experiment</h1>

            <div className="sectionWrapper">
               <h2>Central Shape Adjustment</h2>
               <div className="sliderDiv">
                  <div className="labelDiv">
                     <label className="sliderLabel">Shape Size</label>
                  </div>
                  <input onChange={this.props.sizeChange} className="slider" type="range" min="1" max="10" value={this.props.sizeValue} />
               </div>
   
               <div className="sliderDiv">
                  <div className="labelDiv">
                     <label className="sliderLabel">Shape Vertices</label>
                  </div>
                  
                  <input onChange={this.props.verticesChange} className="slider" type="range" min="0" max="5" value={this.props.vertices} />
               </div>
            </div>

            {/* BULB ADJUSTMENT ZONE */}

            <div className="sectionWrapper">
               <div className="bulbTitle">
                  <h2>Floating Bulb Speed Adjusters</h2>
                  <h2>maxi: 1 min: -1 </h2>
               </div>
               <div className="bulbSpeed__wrapper" >
               
                  <div className="bulbControl__wrapper">
                     <div className="labelDiv">
                        <label htmlFor="">Top Bulb</label>
                     </div>
                     <div>
                        <NumericInput onChange={this.props.topBulbSpeedChange} className="numberInput" step={0.001} max={1} min={-1} value={this.props.topBulbSpeed} />
                        {/* <input type="number" onChange={this.props.topBulbSpeedChange} className="numberInput" step={0.001} max={1} min={-1} value={this.props.topBulbSpeed} /> */}
                     </div>
                  </div>
                  
                  <div className="bulbControl__wrapper">
                     <div className="labelDiv">
                        <label htmlFor="">Middle Bulb</label>
                     </div>
                     <div>
                        <NumericInput onChange={this.props.middleBulbSpeedChange} className="numberInput" step={0.001} max={1} min={-1} value={this.props.middleBulbSpeed} />
                     </div>
                  </div>
   
                  <div className="bulbControl__wrapper">
                     <div className="labelDiv">
                        <label htmlFor="">Bottom Bulb</label>
                     </div>
                     <div>
                        <NumericInput onChange={this.props.bottomBulbSpeedChange} className="numberInput" step={0.001} max={1} min={-1} value={this.props.bottomBulbSpeed} />
                     </div>
                  </div>
               </div>
            </div>

            <div className="sectionWrapper">
               <div className="bulbTitle">
                  <h2>Bulb Luminosity Adjuster</h2>
                  <h2> max: 2000 min: 1 </h2>
               </div>
               <div className="bulbSpeed__wrapper" >

                  <div className="bulbControl__wrapper">
                     <div className="labelDiv">
                        <label htmlFor="">Top Bulb</label>
                     </div>
                     <div>
                        <NumericInput onChange={this.props.topBulbLumChange} className="numberInput" step={1} max={2000} min={1} value={this.props.topBulbLum} />
                     </div>
                  </div>

                  <div className="bulbControl__wrapper">
                     <div className="labelDiv">
                        <label htmlFor="">Middle Bulb</label>
                     </div>
                     <div>
                        <NumericInput onChange={this.props.middleBulbLumChange} className="numberInput" step={1} max={2000} min={1} value={this.props.middleBulbLum} />
                     </div>
                  </div>

                  <div className="bulbControl__wrapper">
                     <div className="labelDiv">
                        <label htmlFor="">Bottom Bulb</label>
                     </div>
                     <div>
                        <NumericInput onChange={this.props.bottomBulbLumChange} className="numberInput" step={1} max={2000} min={1} value={this.props.bottomBulbLum} />
                     </div>
                  </div>
               </div>
            </div>

            {/* COLOR BUTTON ZONE */}
            <div className="sectionWrapper">
               <h2>Color Adjusters</h2>
               <div className="colorButtons">
                  <div className="colorButton__wrapper">
                     <div className="colorButtonDiv">
                        <input onClick={this.props.getRandomColor} className="randomColorButton" type="button" value="Change SHAPE color"/>
                     </div>
                     <p>Currently: <span style={shapeColor}>{this.props.color}</span></p>
                  </div>
      
                  <div className="colorButton__wrapper">
                     <div className="colorButtonDiv">
                        <input onClick={this.props.getRandomLightsColor} className="randomColorButton" type="button" value="Change LIGHTS color"/>
                     </div>
                     <p>Currently: <span style={lightsColor}>{this.props.lightsColor}</span></p>
                  </div>
               </div>
               
               <a onClick={this.props.toggleControls} className="showControlsButton" href="">
                  <i className="far fa-times-circle"></i>
               </a>
            </div>
            <div className="nameSocials" >
               <span>by: Aaron Janke </span>
               <span className="socials">
                  <a href="aaronjanke.com" target="_blank"><i className="fas fa-mouse-pointer"></i></a>
                  <a href="https://twitter.com/aaronjanke" target="_blank"><i className="fab fa-twitter"></i></a>
               </span> 
            </div>

         </form>
      )
   }
};

export default Controls;