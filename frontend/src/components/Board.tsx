import Stone from './Stone';
import { calculateWinner } from '../utils/calculateWinner';

interface BoardProps {
  xIsNext: boolean;
  changeTurn: () => void;
}

export default function Board({ xIsNext, changeTurn }: BoardProps) {
  const boardSize = 19;
  // todo: changeTurnを渡すのではなく、winner判定を含めた新しい関数を作り、それを渡す
  const Stones = Array(boardSize * boardSize).fill(<Stone changeTurn={changeTurn} xIsNext={xIsNext} />);

  const winner = calculateWinner(Stones); // 要修正
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="mb-2 flex justify-center items-center">{status}</div>
      {/* todo: 頑張って描画する */}
    </>
  );
}