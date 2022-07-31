import React, { Component } from 'react';
import axios from 'axios';
import Joke from '../joke/Joke';
import './JokeList.css';

const API_BASE_URL = 'https://icanhazdadjoke.com/';

class JokeList extends Component {
    static defaultProps = {
        initialJokeCount: 10
    };
    constructor(props){
        super(props);
        this.state = {
            jokes: [],
            currJoke: {},
        };
        this.addMoreJokes = this.addMoreJokes.bind(this);
        this.generateUpVote = this.generateUpVote.bind(this);
        this.generateDownVote = this.generateDownVote.bind(this);
        this.setCurrentJoke = this.setCurrentJoke.bind(this);
    }

    async componentDidMount(){

        let initialJokes = await this.getJokes();

        // console.log(`joke => ${JSON.stringify(initialJokes)}`);
        console.log(`initialJokes.length => ${initialJokes.length}`);
        this.setState({jokes: initialJokes})
    }

    async getJokes(){
        let jokeBatch = [];

        while (jokeBatch.length < 10) {
            
            let joke = {};
            
            let res = await axios.get(`${API_BASE_URL}`,{headers: {Accept: 'application/json'}});
            // console.log(`res.data => ${JSON.stringify(res.data)}`);

            joke['id'] = res.data.id;
            joke['joke'] = res.data.joke;
            joke['upVotes'] = 0;
            joke['downVotes'] = 0;
            joke['voteTotal'] = 0;
            joke['voteTotalStyle'] = `Joke-Vote-Total`;
            joke['isCurrent'] = false;

            // console.log(`joke => ${JSON.stringify(joke)}`);

            let isIncluded = jokeBatch.includes(joke);
            // console.log(`isIncluded => ${isIncluded}`);

            if(!isIncluded){
                jokeBatch.push(joke);
            }
            
        }

        return jokeBatch;
    }

    async addMoreJokes(){
        let additionalJokes = await this.getJokes();
        let newJokes = [...this.state.jokes, ...additionalJokes];
        this.setState({jokes: newJokes});
    }

    generateJokes(){
        let jokes = this.state.jokes.sort((a,b) => Number(b.voteTotal) - Number(a.voteTotal)).map(j => (
            <Joke 
                key={j.id} 
                jokeObject={j} 
                joke={j.joke} 
                upVotes={j.upVotes} 
                downVotes={j.downVotes} 
                voteTotal={j.voteTotal} 
                voteTotalStyle={j.voteTotalStyle}
                idx={this.state.jokes.indexOf(j)} 
                generateUpVote={this.generateUpVote} 
                generateDownVote={this.generateDownVote} 
                isCurrent={j.isCurrent} 
                setCurrentJoke={this.setCurrentJoke} />
        ));

        return jokes;
    }

    generateUpVote(idx){
        console.log(`@generateUpVote idx => ${idx}`);
        let newJokes = [...this.state.jokes];
        console.log(`Pre @generateUpVote newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);
        newJokes[idx].upVotes += 1;
        newJokes[idx].voteTotal += 1;
        newJokes[idx].voteTotalStyle = this.evaluateVoteTotalColor(newJokes[idx].voteTotal);
        console.log(`Post @generateUpVote newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);
        this.setState({jokes: newJokes});
    }

    generateDownVote(idx){
        console.log(`@generateDownVote idx => ${idx}`);
        let newJokes = [...this.state.jokes];
        console.log(`Pre @generateDownVote newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);
        newJokes[idx].downVotes += 1;
        newJokes[idx].voteTotal -= 1;
        newJokes[idx].voteTotalStyle = this.evaluateVoteTotalColor(newJokes[idx].voteTotal);
        console.log(`Post @generateDownVote newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);
        this.setState({jokes: newJokes});
    }

    setCurrentJoke(joke){
        // console.log(`@setCurrentJoke idx => ${this.state.jokes.indexOf(joke)}`);

        let newJokes = [...this.state.jokes];

        let currIdx = newJokes.indexOf(this.state.currJoke);
        let newCurrIdx = newJokes.indexOf(joke);

        console.log(`currIdx: ${currIdx} | newCurrIdx: ${newCurrIdx}`);

        if(currIdx >= 0){
            newJokes[currIdx].isCurrent = false;
        }

        newJokes[newCurrIdx].isCurrent = true;

        // console.log(`Pre @setCurrentJoke newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);

        // if(newJokes.includes(this.currJoke)){
        //     newJokes[currIdx].isCurrent = false;
        //     newJokes[newCurrIdx].isCurrent = true;
        // }else{
        //     newJokes[newCurrIdx].isCurrent = true;
        // }
        
        

        // console.log(`Post @setCurrentJoke newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);

        this.setState({currJoke: joke});
    }

    evaluateVoteTotalColor(voteTotal){
        let voteTotalStyle;
        let isNegative = voteTotal < 0;
        let isPositive = voteTotal >= 1;
        let isBalanced = voteTotal === 0;

        if(isNegative){
            voteTotalStyle = `Joke-Vote-Total Joke-Vote-Total-Negative`;
        }

        if(isPositive){
            voteTotalStyle = `Joke-Vote-Total Joke-Vote-Total-Positive`;
        }

        if(isBalanced){
            voteTotalStyle = `Joke-Vote-Total`;
        }

        return voteTotalStyle;
    }

  render() {

    let currentJokes = this.generateJokes(); 

    return (
      <div className='JokeList'>
        <div className='JokeList-Container'>
            <div className='JokeList-Console'>
                <div className='JokeList-Markee'>
                    <h1>Joke List</h1>
                </div>
                <div className='JokeList-Control'>
                    <button className='JokeList-Control-Btn' onClick={this.addMoreJokes}>Add Jokes</button>
                </div>
            </div>
            <div className='JokeList-Display'>
                {currentJokes}
            </div>
        </div>
        
    </div>
    )
  }
}

export default JokeList;