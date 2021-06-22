import { useState, useEffect } from 'react';

import SetCard from '../components/SetCard';

export default function GameBoard({
  boardCards,
  dealCards,
  setBoardCards,
  addPoint
}) {
  const [selectedCards, setSelectedCards] = useState([]);

  const toggleSelectedCard = card => {
    if (isSelected(card)) {
      setSelectedCards(selectedCards.filter(sCard => sCard.id !== card.id));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const isSelected = card => {
    return selectedCards.filter(sCard => sCard.id === card.id).length > 0;
  };

  const showBoardCards = () => {
    return boardCards.map(card => {
      return (
        <SetCard
          card={card}
          key={card.id}
          toggleSelectedCard={toggleSelectedCard}
          isSelected={isSelected(card)}
        />
      );
    });
  };

  const handleSelectedCards = () => {
    if (selectedCards.length >= 3) {
      if (checkIsSet()) {
        setTimeout(() => {
          removeSelectedCards();
          addPoint();
          dealCards();
        }, 500);
      }
      setTimeout(() => setSelectedCards([]), 500);
    }
  };

  const removeSelectedCards = () => {
    const newCards = boardCards.filter(card => {
      return (
        card.id !== selectedCards[0].id &&
        card.id !== selectedCards[1].id &&
        card.id !== selectedCards[2].id
      );
    });
    setBoardCards(newCards);
  };

  const checkIsSet = () => {
    const cards = selectedCards;
    const attributes = ['color', 'fill', 'count', 'shape'];

    for (let i in attributes) {
      //TODO: this is ugly, refactor
      const attribute = attributes[i];
      if (
        cards[0][attribute] === cards[1][attribute] &&
        cards[0][attribute] !== cards[2][attribute]
      ) {
        console.log('Incorrect attribute: ' + attribute);
        return false;
      }
      if (
        cards[0][attribute] !== cards[1][attribute] &&
        cards[0][attribute] === cards[2][attribute]
      ) {
        console.log('Incorrect attribute: ' + attribute);
        return false;
      }
      if (
        cards[1][attribute] !== cards[0][attribute] &&
        cards[1][attribute] === cards[2][attribute]
      ) {
        console.log('Incorrect attribute: ' + attribute);
        return false;
      }
      if (
        cards[1][attribute] === cards[0][attribute] &&
        cards[1][attribute] !== cards[2][attribute]
      ) {
        console.log('Incorrect attribute: ' + attribute);
        return false;
      }
      if (
        cards[2][attribute] !== cards[1][attribute] &&
        cards[2][attribute] === cards[0][attribute]
      ) {
        console.log('Incorrect attribute: ' + attribute);
        return false;
      }
      if (
        cards[2][attribute] === cards[1][attribute] &&
        cards[2][attribute] !== cards[0][attribute]
      ) {
        console.log('Incorrect attribute: ' + attribute);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    handleSelectedCards();
  }, [selectedCards]);

  return <div className='GameBoard'>{showBoardCards()}</div>;
}
