import { useState } from 'react';
import Stone from './Stone';

interface BoardProps {
  blackIsNext: boolean;
  changeTurn: () => void;
}

export default function Board({ blackIsNext, changeTurn }: BoardProps) {
  const boardSize = 19;
  const minCellSize = 20;
  const maxCellSize = 50;

  const stoneStates = Array(boardSize * boardSize).fill(null).map(() => useState<null | boolean>(null));

  const winner = calculateWinner(stoneStates.map(([stoneKind]) => stoneKind), boardSize, !blackIsNext);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (blackIsNext ? 'Black' : 'White');
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
            stoneStates.map(([stoneKind, setStoneKind], index) => {
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


const calculateWinner = (stoneKinds: (null | boolean)[], boardSize: number, blackPriority: boolean): null | string => {

  type stoneCounter = {
    black: number,
    white: number,
    prev: null | boolean,
    continuous: number
  }

  const mergeStoneCounter = (counter1: stoneCounter, counter2: stoneCounter) => {
    return {
      black: Math.max(counter1.black, counter2.black),
      white: Math.max(counter1.white, counter2.white),
      prev: null,
      continuous: 0,
    }
  }

  const calculateCounterFromLine = (line: (boolean | null)[]): stoneCounter => {
    return line.reduce((acc: stoneCounter, cur: boolean | null) => {
      if (cur === null) {
        return { black: acc.black, white: acc.white, prev: null, continuous: 0 };
      }
      return {
        black: cur && acc.prev === cur ? Math.max(acc.continuous + 1, acc.black) : Math.max(acc.black, 1),
        white: !cur && acc.prev === cur ? Math.max(acc.continuous + 1, acc.white) : Math.max(acc.white, 1),
        prev: cur,
        continuous: acc.prev === cur ? acc.continuous + 1 : 1,
      };
    }, { black: 0, white: 0, prev: null, continuous: 0 });
  }

  const lines: (boolean | null)[][] = [];
  let grid: (boolean | null)[][] = [];
  for (let i = 0; i < boardSize; i++) {
    grid.push(stoneKinds.slice(i * boardSize, (i + 1) * boardSize));
  }

  const rotationGrid = (grid: (any)[][]): (any)[][] => {
    return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
  }

  for (let i = 0; i < 4; i++) {
    // 縦横方向
    if (i < 2) {
      lines.push(...grid);
    }
    // 斜め方向（右下）
    for (let row = 0; row < boardSize; row++) {
      lines.push([]);
      for (let d = 0; d < boardSize; d++) {
        if (row + d < boardSize) {
          lines[lines.length - 1].push(grid[row + d][d]);
        } else {
          break;
        }
      }
    }
    grid = rotationGrid(grid);
  }

  const mergedCounter: stoneCounter = lines.map(calculateCounterFromLine).reduce(mergeStoneCounter);

  if (mergedCounter.black >= 5 && mergedCounter.white >= 5) {
    return blackPriority ? 'Black' : 'White';
  } else if (mergedCounter.black >= 5) {
    return 'Black';
  } else if (mergedCounter.white >= 5) {
    return 'White';
  } else {
    return null;
  }

}