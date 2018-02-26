import React from 'react';
import ReactDOM from 'react-dom';
import Shape from './shape.js';
import Controls from './controls.js';
import axios from 'axios';

class App extends React.Component {
   constructor() {
      super()

      this.state = {
         sizeValue: 1,
         controlsHidden: false,
         color: "red",
         vertices: 0
      }   

      this.sizeChange = this.sizeChange.bind(this);
      this.getRandomColor = this.getRandomColor.bind(this);
      this.toggleControls = this.toggleControls.bind(this);
      this.verticesChange = this.verticesChange.bind(this);
   }

   getRandomColor() {
      axios.get('https://fun-fun-colors.herokuapp.com/randomcolor')
      .then((res) => {
         this.setState({color: res.data.color});
      })
   }

   sizeChange(e) {
      this.setState({sizeValue: e.target.value});
   }

   verticesChange(e) {
      this.setState({vertices: e.target.value}, () => console.log(this.state.vertices) );
   }

   toggleControls(e) {
      e.preventDefault();
      this.setState({controlsHidden: !this.state.controlsHidden});
   }

    render() {
      return (
         
         <div className="mainDiv" >
            <Controls vertices={this.state.vertices} verticesChange={this.verticesChange} controlsHidden={this.state.controlsHidden} toggleControls={this.toggleControls} sizeValue={this.state.sizeValue} sizeChange={this.sizeChange} getRandomColor={this.getRandomColor} color={this.state.color} />
            <Shape color={this.state.color} sizeValue={this.state.sizeValue} vertices={this.state.vertices} />
        </div>
      )
   }
}

ReactDOM.render(<App/>, document.getElementById('app'));