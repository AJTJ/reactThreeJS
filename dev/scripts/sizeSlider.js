import React from 'react';

class SizeSlider extends React.Component {
   constructor() {
      super()

      this.sizeChange = this.handleChange.bind(this);
   }

   handleChange() {
      console.log(event.target.value);
   }

   render() {
      return (
         <input onChange={this.handleChange} className="sizeSlider" type="range" min="3" max="10" defaultValue="3"/>
      )
   }
};

export default SizeSlider;



