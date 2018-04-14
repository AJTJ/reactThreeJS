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
      middleBulbLum: 300,
      topBulbLum: 300,
      bottomBulbLum: 300,
    }   

    // this.sizeChange = this.sizeChange.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
    this.getRandomLightsColor = this.getRandomLightsColor.bind(this);
    this.toggleControls = this.toggleControls.bind(this);
    // this.verticesChange = this.verticesChange.bind(this);
    // this.middleBulbSpeedChange = this.middleBulbSpeedChange.bind(this);
    // this.topBulbSpeedChange = this.topBulbSpeedChange.bind(this);
    // this.bottomBulbSpeedChange = this.bottomBulbSpeedChange.bind(this);
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

  //FUNCTION FOR TOGGLING THE VISIBILITY OF THE CONTROL BOX
  toggleControls(e) {
    e.preventDefault();
    this.setState({controlsHidden: !this.state.controlsHidden});
  }

  render() {
    return (
      <div className="mainDiv" >
        { this.state.controlsHidden ? <a className="hamburgerIcon" onClick={this.toggleControls} href=""><i  className="fas fa-bars fa-2x"></i></a>
        : null}
        <Controls 
          vertices={this.state.vertices} 
          verticesChange={(e) => this.setState({ vertices: e.target.value })} 
          controlsHidden={this.state.controlsHidden} 
          toggleControls={this.toggleControls} 
          sizeValue={this.state.sizeValue} 
          sizeChange={(e) => this.setState({ sizeValue: e.target.value })} 
          getRandomColor={this.getRandomColor} 
          color={this.state.color} 
          getRandomLightsColor={this.getRandomLightsColor} 
          lightsColor={this.state.lightsColor} 
          middleBulbSpeed={this.state.middleBulbSpeed}
          topBulbSpeed={this.state.topBulbSpeed}
          bottomBulbSpeed={this.state.bottomBulbSpeed}
          topBulbSpeedChange={(e) => this.setState({ topBulbSpeed: e })}
          middleBulbSpeedChange={(e) => this.setState({ middleBulbSpeed: e })}
          bottomBulbSpeedChange={(e) => this.setState({ bottomBulbSpeed: e })}
          middleBulbLum={this.state.middleBulbLum}
          topBulbLum={this.state.topBulbLum}
          bottomBulbLum={this.state.bottomBulbLum}
          topBulbLumChange={(e) => this.setState({ topBulbLum: e })}
          middleBulbLumChange={(e) => this.setState({ middleBulbLum: e })}
          bottomBulbLumChange={(e) => this.setState({ bottomBulbLum: e })}
        />
        <Shape 
          lightsColor={this.state.lightsColor} 
          color={this.state.color} 
          sizeValue={this.state.sizeValue} 
          vertices={this.state.vertices} 
          middleBulbSpeed={this.state.middleBulbSpeed}
          topBulbSpeed={this.state.topBulbSpeed}
          bottomBulbSpeed={this.state.bottomBulbSpeed}
          middleBulbLum={this.state.middleBulbLum}
          topBulbLum={this.state.topBulbLum}
          bottomBulbLum={this.state.bottomBulbLum}
        />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));