import React, { Component } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import './CardDeck.css';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

class CardDeck extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: [],
            isSuccess: false,
            deck_id: '',
            remaining: 0,
            cardsDrawn: 0,
            shuffled: false,
            outOfCards: true
        };
        this.drawCard = this.drawCard.bind(this);
    }

    async componentDidMount(){
        let res = await axios.get(`${API_BASE_URL}new/shuffle/`);
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

        let deckId = this.state.deck_id;
        let deckUrl = `${API_BASE_URL}${deckId}/draw/`;

        try {
            
            let res = await axios.get(deckUrl);
            let refreshedDeck = res.data;

            console.log(`refreshedDeck Data: ${JSON.stringify(refreshedDeck)}`);

            if (refreshedDeck.success) {
                let remainingDelta = this.state.remaining - 1;
                let cardsDrawnDelta = this.state.cardsDrawn + 1;
                let cardsDelta = [...this.state.cards, ...refreshedDeck.cards];
                this.setState({isSuccess: refreshedDeck.success, cards: cardsDelta, remaining: refreshedDeck.remaining, cardsDrawn: cardsDrawnDelta});
            } else {
                this.setState({outOfCards: true});
                throw new Error('there are no cards to be drawn...')
            }

            // if((this.state.remaining === 0) && (this.state.cardsDrawn === 52)){
            //     this.setState({outOfCards: true});
            // }

        } catch (error) {

            // alert(error);
            console.log(error);

        }

    }

  render() {

    let cardDeck = this.generateCurrentDeck();

    let deckStatus = `${this.state.cardsDrawn} drawn | ${this.state.remaining} remaining`;

    return (
      <div className='CardDeck'>
        <div className='CardDeck-Console'>
            <div>{deckStatus}</div>
            <button onClick={this.drawCard} disabled={this.state.outOfCards}>{this.state.outOfCards ? 'Out of Cards!!!' : 'Draw A New Card!!!'}</button>
        </div>
        <div className='CardDeck-Display'>
            {cardDeck}
        </div>
      </div>
    )
  }
}

export default CardDeck;