import Stone from './Stone';
import { calculateWinner } from '../utils/calculateWinner';

interface BoardProps {
  xIsNext: boolean;
  changeTurn: () => void;
}

export default function Board({ xIsNext, changeTurn }: BoardProps) {
  const boardSize = 19;
  const minCellSize = 20;
  const maxCellSize = 40;

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
    <>
      <div className="mb-2 flex justify-center items-center">{status}</div>
      <div
        className="flex justify-center items-center"
        style={{ minWidth: `${boardSize * minCellSize + (boardSize - 1) * 4}px` }}
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