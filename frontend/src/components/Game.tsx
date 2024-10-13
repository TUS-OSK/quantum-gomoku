import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const [turnCount, setTurnCount] = useState(0);

  function resetGame() {
    setTurnCount(0);
    // todo: resetをboradに伝える指示が必要
  }

  function changeTurn() {
    setTurnCount(turnCount + 1);
    return turnCount % 2 === 0 ? 'X' : 'O';
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Board
          xIsNext={turnCount % 2 === 0}
          changeTurn={changeTurn}
        />
        <button
          className="m-5 p-2 bg-black text-white rounded hover:bg-gray-600"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
    </>
  );
}
