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
            jokes: []
        };

        this.generateUpVote = this.generateUpVote.bind(this);
        this.generateDownVote = this.generateDownVote.bind(this);
    }

    async componentDidMount(){

        let initialJokes = [];

        while (initialJokes.length < 10) {
            
            let joke = {};
            
            let res = await axios.get(`${API_BASE_URL}`,{headers: {Accept: 'application/json'}});
            console.log(`res.data => ${JSON.stringify(res.data)}`);

            joke['id'] = res.data.id;
            joke['joke'] = res.data.joke;
            joke['upVotes'] = 0;
            joke['downVotes'] = 0;

            console.log(`joke => ${JSON.stringify(joke)}`);

            let isIncluded = initialJokes.includes(joke);
            console.log(`isIncluded => ${isIncluded}`);

            if(!isIncluded){
                initialJokes.push(joke);
            }
            
        }

        console.log(`joke => ${JSON.stringify(initialJokes)}`);
        console.log(`initialJokes.length => ${initialJokes.length}`);
    }

    generateJokes(){
        let jokes = this.state.jokes.map(j => (
            <Joke key={j.id} joke={j.joke} upVotes={j.upVotes} downVotes={j.downVotes} idx={this.state.jokes.indexOf(j)} />
        ));
    }

    generateUpVote(idx){
        let newJokes = [...this.state.jokes];
        newJokes[idx].upVotes =+ 1;
        this.setState({jokes: newJokes});
    }

    generateDownVote(idx){
        let newJokes = [...this.state.jokes];
        newJokes[idx].downVotes =+ 1;
        this.setState({jokes: newJokes});
    }

  render() {

    let currentJokes = this.generateJokes(); 

    return (
      <div className='JokeList'>
        <div className='JokeList-Console'>
            <div className='Jokelist-Markee'></div>
            <div className='JokeList-Control'></div>
        </div>
        <div className='JokeList-Display'>
            {currentJokes}
        </div>
    </div>
    )
  }
}

export default JokeList;