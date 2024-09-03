import Stone from './Stone';
import { calculateWinner } from '../utils/calculateWinner';

interface BoardProps {
  xIsNext: boolean;
  stones: Array<string | null>;
  onPlay: (stones: Array<string | null>) => void;
}

export default function Board({ xIsNext, stones, onPlay }: BoardProps) {
  const boardSize = 19;

  function handleClick(i: number) {
    if (calculateWinner(stones) || stones[i]) {
      return;
    }
    const nextStones = stones.slice();
    if (xIsNext) {
      nextStones[i] = 'X';
    } else {
      nextStones[i] = 'O';
    }
    onPlay(nextStones);
  }

  const winner = calculateWinner(stones);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  // TODO: これは酷い実装なので、リファクタリング(関数型プログラミングらしく)
  const boardRows = [];
  for (let row = 0; row < boardSize; row++) {
    const rowStones = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      rowStones.push(
        <Stone key={index} value={stones[index]} onStoneClick={() => handleClick(index)} />
      );
    }
    boardRows.push(
      <div key={row} className="clear-both table">
        {rowStones}
      </div>
    );
  }

  return (
    <>
      <div className="mb-2 flex justify-center items-center">{status}</div>
      {boardRows}
    </>
  );
}
