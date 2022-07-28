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

    if (hours.length < 2) {
      hours = `0${hours}`; 
    }

    let minutes = this.state.time.getMinutes().toString();

    if (minutes.length < 2) {
      minutes = `0${minutes}`; 
    }

    let seconds = this.state.time.getSeconds().toString();

    if (seconds.length < 2) {
        seconds = `0${seconds}`; 
    }
    
    let fullTime = `${hours}:${minutes}:${seconds}`;
    return (
      <div className='Timer'>
        <h1 className='Timer-Title'>Timer</h1>
        <div className='Timer-Display'>
          <h2 className='Timer-Time'>{fullTime}</h2>
        </div>
      </div>
    )
  }
}

export default Timer;