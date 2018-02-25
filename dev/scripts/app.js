import React from 'react';
import ReactDOM from 'react-dom';
import Shape from './shape.js';
// import SizeSlider from './sizeSlider.js';

class App extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 1,
      }   

      this.sizeChange = this.sizeChange.bind(this);
   }

   sizeChange(e) {
      //.setState accepts two parameters, the change and a callback function.
      //read article on .setState and prevState
      this.setState({sizeValue: e.target.value});
   }

    render() {
      return (
         <div>
            <input onChange={this.sizeChange} className="sizeSlider" type="range" min="1" max="10" defaultValue="1"/>
            <Shape sizeValue={this.state.sizeValue}/>
        </div>
      )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));


// constructor() {
//    super()

//    this.state = {
//       sizeValue = 3
//    }
// }

// size={this.state.size}
            // {/* <form action="">
            //    <input type="text" onChange={this.handleChange}/>
            
            // </form>
            // <div>

            // </div> */}

// constructor() {
//    super();
//    this.state = {
//       size: 4
//    }
// }
// renderAnimation() {
//    cube.rotation.x += this.state.size;
//    cube.rotation.y += 0.005;
// }

// handleChange() {
//    //capture the value of the input
//    //store that inside of state
// }
