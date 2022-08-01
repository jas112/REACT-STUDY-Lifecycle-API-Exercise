import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
            currJoke: JSON.parse(window.localStorage.getItem('currJoke') || '{}'),
            isLoading: false
        };
        this.getJokes = this.getJokes.bind(this);
        this.addMoreJokes = this.addMoreJokes.bind(this);
        this.generateUpVote = this.generateUpVote.bind(this);
        this.generateDownVote = this.generateDownVote.bind(this);
        this.setCurrentJoke = this.setCurrentJoke.bind(this);
        this.initJokeList = this.initJokeList.bind(this);
        this.resetLocalStorageJokeValues = this.resetLocalStorageJokeValues.bind(this);
        this.handleAddMoreJokes = this.handleAddMoreJokes.bind(this);
    }

    async componentDidMount(){
        this.setState({isLoading: true},this.initJokeList);
    }

    async initJokeList(){
        if(this.state.jokes.length === 0){
            // this.handleAddMoreJokes();
            this.setState({isLoading: true},async () => {
                let newJokes = await this.getJokes();
                this.setState({jokes: newJokes, currJoke: {}, isLoading: false});
            });
        }else{
            this.setState({isLoading: true},this.resetLocalStorageJokeValues);
        }
    }

    resetLocalStorageJokeValues(){
        let jokes;
        let resetJokes;

        jokes = [...this.state.jokes];
        resetJokes = jokes.map(j => 
                j.isCurrent === true ? {...j, isCurrent: false} : j
            );

        this.setState({jokes: resetJokes, currJoke: {}, isLoading: false}, () => {
            window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
            window.localStorage.setItem('currJoke', JSON.stringify(this.state.currJoke));
        });
    }

    async getJokes(){
        let jokeBatch = [];

        console.log(`@getJokes this.props.initialJokeCount => ${this.props.initialJokeCount}`);

        while (jokeBatch.length < this.props.initialJokeCount) {
            
            let joke = {};
            
            let res = await axios.get(`${API_BASE_URL}`,{headers: {Accept: 'application/json'}});
            // console.log(`res.data => ${JSON.stringify(res.data)}`);

            joke['id'] = uuidv4();
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

            console.log(`@getJokes jokeBatch length => ${jokeBatch.length}`);
            console.log(`@getJokes jokeBatch => ${JSON.stringify(jokeBatch)}`);
            
        }

        return jokeBatch;
    }

    async addMoreJokes(){
        let additionalJokes = await this.getJokes();
        let newJokes = [...this.state.jokes, ...additionalJokes];
        this.setState({jokes: newJokes, isLoading: false},() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)));
    }

    async handleAddMoreJokes(){
        this.setState({isLoading: true},this.addMoreJokes);
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
        this.setState({jokes: newJokes}, () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)));
        
    }

    generateDownVote(idx){
        console.log(`@generateDownVote idx => ${idx}`);
        let newJokes = [...this.state.jokes];
        console.log(`Pre @generateDownVote newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);
        newJokes[idx].downVotes += 1;
        newJokes[idx].voteTotal -= 1;
        newJokes[idx].voteTotalStyle = this.evaluateVoteTotalColor(newJokes[idx].voteTotal);
        console.log(`Post @generateDownVote newJokes[${idx}] => ${JSON.stringify(newJokes[idx])}`);
        this.setState({jokes: newJokes}, () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes)));
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

        this.setState({jokes: newJokes, currJoke: joke}, () => {
            window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
            window.localStorage.setItem('currJoke', JSON.stringify(this.state.currJoke));
        });
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

    clearLocalStorage(){
        window.localStorage.clear();
    }

    generateLoader(){
        return(
            <div className='JokeList-Loader-Console'>
                <div className='JokeList-Loader'>
                    <div className='JokeList-LoaderB'></div>
                </div>
            </div>
        );
    }

  render() {

    let currentJokes = this.generateJokes(); 
    let loader = this.generateLoader();

    return (
      <div className='JokeList'>
        <div className='JokeList-Container'>
            <div className='JokeList-Console'>
                <div className='JokeList-Markee'>
                    <div className='JokeList-Markee-Icon'>&#9786;</div>
                    <h1>Joke List</h1>
                </div>
                <div className='JokeList-Control'>
                    <button className='JokeList-Control-Btn' onClick={this.handleAddMoreJokes}>Add Jokes</button>
                    <button className='JokeList-Control-Btn-CLRWLS' onClick={this.clearLocalStorage}>Clear LocalStorage</button>
                </div>
            </div>
            <div className='JokeList-Display' id='JokeListDisplayPortal'>
                {this.state.isLoading ? loader : currentJokes}
            </div>
        </div>
        
    </div>
    )
  }
}

export default JokeList;