import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    let altValue = `${this.props.cardValue} of ${this.props.cardSuit}`;
    return (
      <div className='Card'>
        <img style={{transform: this.props.cardTransform}} src={this.props.imageUrl} alt={altValue} />
      </div>
    )
  }
}

export default Card;