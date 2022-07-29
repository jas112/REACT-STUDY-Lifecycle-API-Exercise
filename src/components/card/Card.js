import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    let altValue = `${this.props.cardValue} of ${this.props.cardSuit}`;
    return (
      <div className='Card'>
        <img src={this.props.imageUrl} alt={altValue} />
      </div>
    )
  }
}

export default Card;