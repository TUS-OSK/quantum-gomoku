import { useState } from 'react';
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

  const stoneKinds = Array(boardSize * boardSize).fill(null).map(() => useState<null | boolean>(null));

  const winner = null;
  // const winner = calculateWinner(stoneKinds.map(([state]) => state)); // 要修正
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
            stoneKinds.map(([stoneKind, setStoneKind], index) => {
              const isRightCell = (index + 1) % boardSize === 0;
              const isBottomCell = index >= boardSize * (boardSize - 1);
              const isBlankCell = stoneKind === null;
              return (
                <div
                  className={`border-black ${isRightCell ? '' : 'border-r'} ${isBottomCell ? '' : 'border-b'} ${isBlankCell ? 'hover:bg-slate-300' : ''}`}
                >
                  <Stone
                    stoneKind={stoneKind}
                    setStoneKind={setStoneKind}
                    changeTurn={changeTurn}
                    blackIsNext={blackIsNext}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}