import React, { Component } from 'react';
import axios from 'axios';
import './ZenScribe.css';

class ZenScribe extends Component {

    constructor(props){
        super(props);
        this.state = {
            quote: '',
            isLoaded: false
        };
    }

    componentDidMount(){
        axios.get("https://api.github.com/zen").then(res => {
            setTimeout(
                function() {
                    this.setState({quote: res.data, isLoaded: true});
                }.bind(this), 
            3000);
        });
    }

    generateLoader(){
        return(
            <div className='ZenScribe-Loader'>
                <div className='ZenScribe-LoaderB'></div>
            </div>
        );
    }

  render() {

    let loader = this.generateLoader();
    let wordsOfWisdom = this.state.quote;

    return (
      <div className='ZenScribe'>
        <h1 className='ZenScribe-Title'>Heed My Wisdom!!!</h1>
        <div className='ZenScribe-Quote'>
            {this.state.isLoaded ? wordsOfWisdom : loader}
        </div>
      </div>
    )
  }
}

export default ZenScribe