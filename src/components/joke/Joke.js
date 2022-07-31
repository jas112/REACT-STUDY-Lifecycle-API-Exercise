import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
    constructor(props){
        super(props);
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleDownVote = this.handleDownVote.bind(this);
        this.handleSetCurrentJoke = this.handleSetCurrentJoke.bind(this);
        this.evaluateVoteExpression = this.evaluateVoteExpression.bind(this);
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

    evaluateVoteExpression(){
        let vTotal = this.props.voteTotal;
        let isBalanced = vTotal === 0;
        let isPositive = (vTotal > 0) && (vTotal < 5);
        let isPositive10 = (vTotal >= 5) && (vTotal < 10);
        let isPositive15 = (vTotal >= 10)
        let isNegative = (vTotal < 0) && (vTotal > -5);
        let isNegative10 = (vTotal <= -5) && (vTotal > -10);
        let isNegative15 = (vTotal <= -10)

        if(isBalanced){
            return (<div className='Joke-Vote-Expression-Emoji'>🙂</div>);
        }
        if(isPositive){
            return (<div className='Joke-Vote-Expression-Emoji Joke-Vote-Expression-Emoji-Positive Joke-Vote-Expression-PA'>😀</div>);
        }
        if(isPositive10){
            return (<div className='Joke-Vote-Expression-Emoji Joke-Vote-Expression-Emoji-Positive Joke-Vote-Expression-PB'>😂</div>);
        }
        if(isPositive15){
            return (<div className='Joke-Vote-Expression-Emoji Joke-Vote-Expression-Emoji-Positive Joke-Vote-Expression-PC'>🤣</div>);
        }
        if(isNegative){
            return (<div className='Joke-Vote-Expression-Emoji Joke-Vote-Expression-Emoji-Negative Joke-Vote-Expression-NA'>🙁</div>);
        }
        if(isNegative10){
            return (<div className='Joke-Vote-Expression-Emoji Joke-Vote-Expression-Emoji-Negative Joke-Vote-Expression-NB'>😬</div>);
        }
        if(isNegative15){
            return (<div className='Joke-Vote-Expression-Emoji Joke-Vote-Expression-Emoji-Negative Joke-Vote-Expression-NC'>🤬</div>);
        }

    }

  render() {

    return (
      <div className={this.props.isCurrent ? 'Joke Joke-isCurrent' : 'Joke'} onClick={this.handleSetCurrentJoke}>
        <div className='Joke-Console'>
            <div className='Joke-Console-Btn Joke-UpVote' onClick={this.handleUpVote}>
                <div className='Joke-Vote-Btn Joke-Vote-Btn-Up'>&uarr;</div>
            </div>
            <div className={this.props.voteTotalStyle}>{Math.abs(this.props.voteTotal)}</div>
            <div className='Joke-Console-Btn Joke-DownVote' onClick={this.handleDownVote}>
                <div className='Joke-Vote-Btn Joke-Vote-Btn-Down'>&darr;</div>
            </div>
        </div>
        <div className='Joke-Content'>{this.props.joke}</div>
        <div className='Joke-Vote-Expression'>
            {this.evaluateVoteExpression()}
        </div>
      </div>
    )
  }
}

export default Joke