import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <div className='Joke'>
        <div className='Joke-Console'>
            <div className='Joke-Console-Btn Joke-UpVote'>
                <button className='Joke-Vote-Btn Joke-Vote-Btn-Up'></button>
            </div>
            <div className='Joke-Content'>{this.props.joke}</div>
            <div className='Joke-Console-Btn Joke-DownVote'>
                <button className='Joke-Vote-Btn Joke-Vote-Btn-Down'></button>
            </div>
        </div>
        
      </div>
    )
  }
}

export default Joke