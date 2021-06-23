import React from 'react';
import Controls from './Controls';
import IconOne from './IconOne';
import IconTwo from './IconTwo';
import IconThree from './IconThree';

export default function Header({ handleNewGame, game, setCardsToShow }) {
  return (
    <header className='Header'>
      <div className='header-background'>
        <IconOne />
        <IconTwo />
        <IconThree />
        <IconOne />
        <IconTwo />
        <IconThree />
        <IconOne />
        <IconTwo />
        <IconThree />
        <IconOne />
        <IconTwo />
        <IconThree />
        <IconOne />
        <IconTwo />
        <IconThree />
        <IconOne />
        <IconTwo />
        <IconThree />
        <IconOne />
        <IconTwo />
        <IconThree />
        <IconOne />
        <IconTwo />
        <IconThree />
      </div>
      <div className='header-content'>
        <div className='title-container'>
          <h1 className='title'>
            Order Up<div>!</div>
          </h1>
        </div>
        <Controls
          handleNewGame={handleNewGame}
          game={game}
          setCardsToShow={setCardsToShow}
        />
      </div>
    </header>
  );
}
