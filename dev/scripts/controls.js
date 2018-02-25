import React from 'react';

class Controls extends React.Component {


   render() {

      // toggleControls(e) {
      
      // }

      return (
         <form  className="controlsForm" action="">
            <input onChange={this.props.sizeChange} className="sizeSlider" type="range" min="1" max="10" value={this.props.sizeValue} />
            <input onChange={this.props.getRandomColor} className="randomColorButton" type="button" value="Get a random color"/>
            {/* <a onClick={this.props.toggleControls} className="showControlsButton" href=""><i class="fas fa-bars"></i></a> */}
         </form>
      )
   }
};

export default Controls;



