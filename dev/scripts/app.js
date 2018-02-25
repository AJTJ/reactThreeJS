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
         menuVisible: true,
         color: "red"
      }   

      this.sizeChange = this.sizeChange.bind(this);
      this.getRandomColor = this.getRandomColor.bind(this);
   }

   getRandomColor() {
      axios.get('http://www.colr.org/json/color/random')
      .then((res) => {
         // console.log(res.data.new_color);
         this.setState({color: res.data.new_color}, () => console.log(this.state.color));
      });
   }

   sizeChange(e) {
      this.setState({sizeValue: e.target.value});
   }

    render() {
      return (
         <div>
            <button onClick={this.getRandomColor}>Get Color</button>
            <Controls sizeValue={this.state.sizeValue} sizeChange={this.sizeChange} />
            <Shape color={this.state.color} sizeValue={this.state.sizeValue}/>
        </div>
      )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

   // toggleControls(e) {
   //    this.state.menuVisible = true ? this.setState({menuVisible = false}) : this.setState({menuVisible = true});
   // }

      // fetch(`http://www.colr.org/json/color/random`, {
   //    method: 'GET',
   // })
   // .then((resp) => resp.json())
   // .then((data) => {
   // console.log(data.new_color);
   // });