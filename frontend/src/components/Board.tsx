import Stone from './Stone';
import { calculateWinner } from '../utils/calculateWinner';

interface BoardProps {
  blackIsNext: boolean;
  changeTurn: () => void;
}

export default function Board({ blackIsNext, changeTurn }: BoardProps) {
  const boardSize = 19;
  const minCellSize = 20;
  const maxCellSize = 50;

  const Stones = Array(boardSize * boardSize).fill(null).map((_, index) => (
    <Stone key={index} changeTurn={changeTurn} blackIsNext={blackIsNext} />
  ));

  const winner = null;
  // const winner = calculateWinner(Stones); // 要修正
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (blackIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="mb-5 flex justify-center items-center text-2xl font-bold">{status}</div>
      <div
        className="flex justify-center items-center"
        style={{ minWidth: `${boardSize * minCellSize}px` }}
      >
        <div
          className="grid border-2 border-black"
          style={{
            gridTemplateColumns: `repeat(${boardSize}, minmax(${minCellSize}px, ${maxCellSize}px))`,
            gridTemplateRows: `repeat(${boardSize}, minmax(${minCellSize}px, ${maxCellSize}px))`,
            width: '100%',
            aspectRatio: '1',
          }}
        >
          {
            Stones.map((Stone, index) => {
              const isRightCell = (index + 1) % boardSize === 0;
              const isBottomCell = index >= boardSize * (boardSize - 1);
              return (
                <div className={
                  `border-black ${isRightCell ? '' : ' border-r'} ${isBottomCell ? '' : ' border-b'}`
                }>
                  {Stone}
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}