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


  // 履歴ジャンプ機能だが、現状は不要なのでコメントアウト
  // TODO: Tailwind CSS でスタイリングでのレスポンシブ対応必要
  // function jumpTo(nextMove: number) {
  //   setCurrentMove(nextMove);
  // }

  // const moves = history.map((stones, move) => {
  //   let description;
  //   if (move > 0) {
  //     description = 'Go to move #' + move;
  //   } else {
  //     description = 'Go to game start';
  //   }
  //   return (
  //     <li key={move}>
  //       <button onClick={() => jumpTo(move)}>{description}</button>
  //     </li>
  //   );
  // });

  return (
    <>
      <div className="flex justify-center">
        <button
          className="m-5 p-2 bg-black text-white rounded hover:bg-gray-600"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      <div className="ml-5">
        <Board
          xIsNext={turnCount % 2 === 0}
          changeTurn={changeTurn}
        />
      </div>
    </>
  );
}