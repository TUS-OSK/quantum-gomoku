import React, { useState } from 'react';
import Board from './Board';

/**
 * The `Game` component represents the main game interface for the Quantum Gomoku game.
 * It manages the game state, including the turn count and the size of the game board.
 * @component
 * @example
 * return (
 *   <Game />
 * )
 * @returns {JSX.Element} The rendered game component.
 */
const Game: React.FC = () => {

  const [turnCount, setTurnCount] = useState(0);
  const BOARD_SIZE = 19;

  const changeTurn = (): void => {
    setTurnCount(turnCount + 1);
    return;
  }

  return (
    <>
      <div className="flex items-center min-h-screen">
        <Board
          BOARD_SIZE={BOARD_SIZE}
          turnCount={turnCount}
          changeTurn={changeTurn}
        />
      </div>
    </>
  );
}

export default Game;
