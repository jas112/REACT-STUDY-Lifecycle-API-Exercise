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
  render() {
    return (
      <div>JokeList</div>
    )
  }
}

export default JokeList;