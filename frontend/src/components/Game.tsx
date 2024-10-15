import React, { useState } from 'react';
import Board from './Board';

const Game: React.FC = () => {
  const [turnCount, setTurnCount] = useState(0);
  const BOARD_SIZE = 19;

  function changeTurn() {
    setTurnCount(turnCount + 1);
    return;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Board
          BOARD_SIZE={BOARD_SIZE}
          blackIsNext={turnCount % 2 === 0}
          changeTurn={changeTurn}
        />
      </div>
    </>
  );
}

export default Game;
