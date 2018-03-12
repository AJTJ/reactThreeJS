import React from 'react';
import ReactDOM from 'react-dom';
import Shape from './shape.js';
import Controls from './controls.js';
import axios from 'axios';

//NOTE ON RESPONSIVENESS: the canvas will automatically resize to the current browser size if you refresh the browser.

class App extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 5,
         controlsHidden: false,
         color: "red",
         lightsColor: "white",
         vertices: 0,
         middleBulbSpeed: 0.004,
         topBulbSpeed: 0.003,
         bottomBulbSpeed: 0.005,
      }   

      this.sizeChange = this.sizeChange.bind(this);
      this.getRandomColor = this.getRandomColor.bind(this);
      this.getRandomLightsColor = this.getRandomLightsColor.bind(this);
      this.toggleControls = this.toggleControls.bind(this);
      this.verticesChange = this.verticesChange.bind(this);
      this.middleBulbSpeedChange = this.middleBulbSpeedChange.bind(this);
      this.topBulbSpeedChange = this.topBulbSpeedChange.bind(this);
      this.bottomBulbSpeedChange = this.bottomBulbSpeedChange.bind(this);
   }



   //FUNCTIONS FOR CHANGING THE ANIMATION

   getRandomColor() {
      axios.get('https://fun-fun-colors.herokuapp.com/randomcolor')
      .then((res) => {
         this.setState({color: res.data.color});
      })
   }

   getRandomLightsColor() {
      axios.get('https://fun-fun-colors.herokuapp.com/randomcolor')
      .then((res) => {
         this.setState({lightsColor: res.data.color});
      })
   }

   sizeChange(e) {
      this.setState({sizeValue: e.target.value});
   }

   verticesChange(e) {
      this.setState({vertices: e.target.value});
   }

   middleBulbSpeedChange(e) {
      // e.preventDefault();
      this.setState({middleBulbSpeed: e.target.value});
   }

   topBulbSpeedChange(e) {
      // e.preventDefault();
      this.setState({topBulbSpeed: e.target.value});
   }

   bottomBulbSpeedChange(e) {
      // e.preventDefault();
      this.setState({bottomBulbSpeed: e.target.value});
   }

   //FUNCTION FOR TOGGLING THE VISIBILITY OF THE CONTROL BOX
   toggleControls(e) {
      e.preventDefault();
      this.setState({controlsHidden: !this.state.controlsHidden});
   }

    render() {
      return (
         <div className="mainDiv" >
            <Controls 
               vertices={this.state.vertices} 
               verticesChange={this.verticesChange} 
               controlsHidden={this.state.controlsHidden} 
               toggleControls={this.toggleControls} 
               sizeValue={this.state.sizeValue} 
               sizeChange={this.sizeChange} 
               getRandomColor={this.getRandomColor} 
               color={this.state.color} 
               getRandomLightsColor={this.getRandomLightsColor} 
               lightsColor={this.state.lightsColor} 
               middleBulbSpeed={this.state.middleBulbSpeed}
               middleBulbSpeedChange={this.middleBulbSpeedChange}
               topBulbSpeed={this.state.topBulbSpeed}
               topBulbSpeedChange={this.topBulbSpeedChange}
               bottomBulbSpeed={this.state.bottomBulbSpeed}
               bottomBulbSpeedChange={this.bottomBulbSpeedChange}
            />
            <Shape 
               lightsColor={this.state.lightsColor} 
               color={this.state.color} 
               sizeValue={this.state.sizeValue} 
               vertices={this.state.vertices} 
               middleBulbSpeed={this.state.middleBulbSpeed}
               topBulbSpeed={this.state.topBulbSpeed}
               bottomBulbSpeed={this.state.bottomBulbSpeed}
            />
        </div>
      )
   }
}

ReactDOM.render(<App/>, document.getElementById('app'));