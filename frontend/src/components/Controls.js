import { useState } from 'react';

export default function Controls({ game, setCardsToShow, handleNewGame }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const areYouSure = () => {};
  return (
    <div className='Controls'>
      {game.cardsToShow < 15 ? (
        <button onClick={() => setCardsToShow(15)}>3 More Cards</button>
      ) : (
        <button disabled> + 3 More Cards</button>
      )}
      <button onClick={handleNewGame}> New Game </button>
    </div>
  );
}
