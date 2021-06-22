import './App.css';

import { useEffect, useState } from 'react';

import GameBoard from './containers/GameBoard';

function App() {
  const generateNewDeck = () => {
    const deck = [];
    const shapes = ['shape-1', 'shape-2', 'shape-3'];
    const colors = ['color-1', 'color-2', 'color-3'];
    const counts = [1, 2, 3];
    const fills = ['fill-1', 'fill-2', 'fill-3'];
    let cardId = 1;
    shapes.forEach(shape => {
      colors.forEach(color => {
        counts.forEach(count => {
          fills.forEach(fill => {
            deck.push({
              id: cardId,
              color: color,
              count: count,
              shape: shape,
              fill: fill
            });
            cardId++;
          });
        });
      });
    });
    return deck;
  };

  const shuffleDeck = deck => {
    var currentIndex = deck.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex],
        deck[currentIndex]
      ];
    }

    return deck;
  };

  const [deck, setDeck] = useState(shuffleDeck(generateNewDeck()));
  const [boardCards, setBoardCards] = useState([]);
  const [points, setPoints] = useState(0);

  const addPoint = () => {
    setPoints(points + 1);
  };

  const dealCards = (targetNofCards = 12) => {
    if (boardCards.length < targetNofCards) {
      const cardsToAdd = targetNofCards - boardCards.length;

      const newDeck = deck.slice(0, -cardsToAdd);
      const newBoardCards = boardCards.concat(deck.slice(-cardsToAdd));

      setDeck(newDeck);
      setBoardCards(newBoardCards);
    }
  };

  useEffect(() => {
    dealCards();
  });

  return (
    <div className='App'>
      <h2>{points}</h2>
      {boardCards.length < 15 ? (
        <h3 onClick={() => dealCards(15)}>3 More Cards</h3>
      ) : null}
      <GameBoard
        boardCards={boardCards}
        dealCards={dealCards}
        setBoardCards={setBoardCards}
        addPoint={addPoint}
      />
    </div>
  );
}

export default App;
