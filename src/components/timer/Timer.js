import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
    constructor(props){
        super(props);
        this.state = {time: new Date()};
        console.log('@Timer-Contructor() Constructor initialized...');
    }

    componentDidMount(){
        console.log('@Timer-ComponentDidMount()');

        this.timerID = setInterval(() => {
            this.setState({time: new Date()});
        }, 1000);
    }

  render() {
    console.log('@Timer-Render() Render initiated...');

    let hours = this.state.time.getHours().toString();
    let minutes = this.state.time.getMinutes().toString();
    let seconds = this.state.time.getSeconds().toString();

    if (seconds.length < 2) {
        seconds = `0${seconds}`; 
    }
    
    let fullTime = `${hours}:${minutes}:${seconds}`;
    return (
      <div className='Timer'>
        <h1>Timer</h1>
        <h2>{this.state.time.getSeconds()}</h2>
        <h2>{fullTime}</h2>
      </div>
    )
  }
}

export default Timer;