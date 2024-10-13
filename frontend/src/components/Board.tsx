import Stone from './Stone';
import { calculateWinner } from '../utils/calculateWinner';

interface BoardProps {
  xIsNext: boolean;
  changeTurn: () => void;
}

export default function Board({ xIsNext, changeTurn }: BoardProps) {
  const boardSize = 19;

  const Stones = Array(boardSize * boardSize).fill(null).map((_, index) => (
    <Stone key={index} changeTurn={changeTurn} xIsNext={xIsNext} />
  ));

  const winner = null;
  // const winner = calculateWinner(Stones); // 要修正
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-2 flex justify-center items-center">{status}</div>
      <div
        className="grid gap-1 border border-black"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(20px, 40px))`,
          gridTemplateRows: `repeat(${boardSize}, minmax(20px, 40px))`,
        }}
      >
        {Stones}
      </div>
    </div>
  );
}