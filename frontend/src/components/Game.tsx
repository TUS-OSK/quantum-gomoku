import { useState } from 'react';
import Board from './Board';

export default function Game() {
  const boardSize = 19;
  const [history, setHistory] = useState([Array(boardSize * boardSize).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentStones = history[currentMove];

  function handlePlay(nextStones: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextStones];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function resetGame() {
    setHistory([Array(boardSize * boardSize).fill(null)]);
    setCurrentMove(0);
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
    <div>
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
          xIsNext={xIsNext}
          stones={currentStones}
          onPlay={handlePlay}
        />
      </div>
      <div className="flex justify-center">
        {/* <ol>{moves}</ol> */}
      </div>
    </div>
  );
}
