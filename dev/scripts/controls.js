import React from 'react';

class Controls extends React.Component {

   render() {
      let spanStyle = {
         color: this.props.color
      }
      return (
         <form className={`controlsForm ${this.props.controlsHidden ? 'controlsHidden' : ''}`} action="">

            <h3>react and three.js experiment</h3>
            <label>Shape Size</label>

            <input onChange={this.props.sizeChange} className="sizeSlider" type="range" min="1" max="10" value={this.props.sizeValue} />

            <div className="colorButtonDiv"><input onClick={this.props.getRandomColor} className="randomColorButton" type="button" value="Change color"/></div>
            <p>Current Color: <span style={spanStyle}>{this.props.color}</span></p>
            
            <a onClick={this.props.toggleControls} className="showControlsButton" href=""><i className="fas fa-angle-left fa-2x"></i></a>

         </form>
      )
   }
};

export default Controls;

      // let dynamicBorder = {
      //    borderColor: this.props.color,
      //    borderStyle: 'solid',
      //    borderWidth: '0 0 1px 0 ',
      // }