import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
    constructor(props){
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleDownVote = this.handleDownVote.bind(this);
        this.handleSetCurrentJoke = this.handleSetCurrentJoke.bind(this);
    }

    handleUpVote(){
        this.props.generateUpVote(this.props.idx);
    }

    handleDownVote(){
        this.props.generateDownVote(this.props.idx);
    }

    handleSetCurrentJoke(){
        this.props.setCurrentJoke(this.props.jokeObject);
    }

  render() {

    return (
      <div className={this.props.isCurrent ? 'Joke Joke-isCurrent' : 'Joke'} onClick={this.handleSetCurrentJoke}>
        <div className='Joke-Console'>
            <div className='Joke-Console-Btn Joke-UpVote' onClick={this.handleUpVote}>
                <div className='Joke-Vote-Btn Joke-Vote-Btn-Up'>&uarr;</div>
            </div>
            <div className='Joke-Vote-Total'>{this.props.voteTotal}</div>
            <div className='Joke-Console-Btn Joke-DownVote' onClick={this.handleDownVote}>
                <div className='Joke-Vote-Btn Joke-Vote-Btn-Down'>&darr;</div>
            </div>
        </div>
        <div className='Joke-Content'>{this.props.joke}</div>
        <div className='Joke-Vote-Expression'></div>
      </div>
    )
  }
}

export default Joke