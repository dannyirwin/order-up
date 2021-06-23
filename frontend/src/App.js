import './App.css';

import { useEffect, useState } from 'react';

import GameBoard from './containers/GameBoard';
import Controls from './components/Controls';
import Header from './components/Header';

import consumer from './cable';

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

  const emptyGame = {
    deck: [],
    cardsToShow: 12
  };
  const [game, setGame] = useState(emptyGame);
  //const [cardsToShow, setCardsOnBoard] = useState(12);

  const dealCards = () => {
    const cards = game.deck.slice(0, game.cardsToShow);
    return cards;
  };

  const createSubscription = () => {
    consumer.subscriptions.create(
      { channel: 'GamesChannel' },
      {
        received: game => {
          if (typeof game.deck === 'string') {
            game.deck = generateDeckFromIdString(game);
          }
          setGame(game);
        }
      }
    );
  };

  const setCardsToShow = (num = 12) => {
    const newGame = { ...game };
    newGame.cardsToShow = num;
    setGame(newGame);
    patchToDB(newGame);
    //postToDB(newGame)
  };

  const deckToIdString = deck => {
    return deck.map(card => card.id).join(' ');
  };

  const removeCardsFromGame = selectedCards => {
    const newGame = { ...game };
    newGame.deck = newGame.deck.filter(card => {
      return (
        card.id !== selectedCards[0].id &&
        card.id !== selectedCards[1].id &&
        card.id !== selectedCards[2].id
      );
    });
    newGame.cardsToShow = 12;
    setGame(newGame);
    patchToDB(newGame);
    //postToDB(newGame);
  };

  const patchToDB = newGame => {
    const gameObj = {
      deck: deckToIdString(newGame.deck),
      cardsToShow: newGame.cardsToShow
    };
    const fetchObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(gameObj)
    };
    fetch('http://localhost:3000/games/' + game.id, fetchObj);
  };

  const generateDeckFromIdString = apiGame => {
    const apiDeckIds = apiGame.deck.split(' ');
    const orderedDeck = generateNewDeck();
    const deck = apiDeckIds.map(id =>
      orderedDeck.find(el => el.id === parseInt(id))
    );
    return deck;
  };

  const getGameFromDb = () => {
    fetch('http://localhost:3000/games/')
      .then(res => res.json())
      .then(apiGames => {
        const newGame = apiGames[apiGames.length - 1];
        if (newGame) {
          const deck = generateDeckFromIdString(newGame);
          newGame.deck = deck;
          setGame(newGame);
        } else {
          handleNewGame();
        }
      });
  };

  const handleNewGame = () => {
    const gameObj = {
      deck: deckToIdString(shuffleDeck(generateNewDeck())),
      cardsToShow: 12
    };
    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(gameObj)
    };
    fetch('http://localhost:3000/games/', fetchObj)
      .then(res => res.json())
      .then(apiGames => {
        const deck = generateDeckFromIdString(apiGames[0]);
        apiGames[0].deck = deck;
        setGame(apiGames[0]);
      });
  };

  // const postToDB = newGame => {
  //   console.log(game.cardsToShow);
  //   const gameObj = {
  //     deck: deckToIdString(newGame.deck),
  //     cardsToShow: newGame.cardsToShow
  //   };
  //   const fetchObj = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(gameObj)
  //   };
  //   fetch('http://localhost:3000/games/', fetchObj);
  // };

  useEffect(() => {
    getGameFromDb();
    createSubscription();
  }, []);

  return (
    <div className='App'>
      <Header
        handleNewGame={handleNewGame}
        game={game}
        setCardsToShow={setCardsToShow}
      />
      {game.deck.length > 0 ? (
        <GameBoard
          boardCards={dealCards()}
          removeCardsFromGame={removeCardsFromGame}
        />
      ) : null}
      <div className='background-wing'></div>
    </div>
  );
}

export default App;
