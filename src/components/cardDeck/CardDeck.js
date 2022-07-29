import React, { Component } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import './CardDeck.css';

class CardDeck extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: [],
            isSuccess: false,
            deck_id: '',
            remaining: 0,
            shuffled: false,
            outOfCards: true
        };
        this.drawCard = this.drawCard.bind(this);
    }

    async componentDidMount(){
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
        let currentDeck = res.data;
        console.log(`currentDeck Data: ${JSON.stringify(currentDeck)}`);
        this.setState({isSuccess: currentDeck.success, deck_id: currentDeck.deck_id, remaining: currentDeck.remaining, shuffled: currentDeck.shuffled, outOfCards: false});
    }

    generateCurrentDeck(){

        let deck = this.state.cards.map(card => (
            <Card key={card.code} imageUrl={card.image} cardValue={card.value} cardSuit={card.suit} />
        ));

        return deck;
    }

    async drawCard(){

        if (this.state.remaining === 0) {
            this.setState({outOfCards: true});
        }else{
            let deckUrl = `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`;
            let res = await axios.get(deckUrl);
            let refreshedDeck = res.data;
            console.log(`refreshedDeck Data: ${JSON.stringify(refreshedDeck)}`);
            let remainingDelta = this.state.remaining - 1;
            let cardsDelta = [...this.state.cards, ...refreshedDeck.cards]
            this.setState({isSuccess: refreshedDeck.success, cards: cardsDelta, remaining: refreshedDeck.remaining});
        }

    }

  render() {

    let cardDeck = this.generateCurrentDeck();

    return (
      <div className='CardDeck'>
        <div className='CardDeck-Console'>
            <button onClick={this.drawCard}>Draw A New Card!!!</button>
        </div>
        <div className='CardDeck-Display'>
            {cardDeck}
        </div>
      </div>
    )
  }
}

export default CardDeck;