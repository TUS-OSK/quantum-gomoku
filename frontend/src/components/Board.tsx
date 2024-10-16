import React, { useState } from 'react';
import Stone from './Stone';

type BoardProps = {
  BOARD_SIZE: number;
  blackIsNext: boolean;
  changeTurn: () => void;
}

/**
 * Board component for the Quantum Gomoku game.
 *
 * @component
 * @param {number} BOARD_SIZE - The size of the board (number of cells per row/column).
 * @param {boolean} blackIsNext - Indicates if the next player is black.
 * @param {() => void} changeTurn - Function to change the turn to the next player.
 *
 * @returns {JSX.Element} The rendered Board component.
 *
 * @example
 * return (
 *  <Board BOARD_SIZE={19} blackIsNext={true} changeTurn={handleChangeTurn} />
 * )
 */
const Board: React.FC<BoardProps> = ({ BOARD_SIZE, blackIsNext, changeTurn }) => {
  const MINIMUM_CELL_SIZE = 20;
  const MAXIMUM_CELL_SIZE = 50;

  const [stoneKinds, setStoneKinds] = useState<(null | boolean)[]>(Array(BOARD_SIZE * BOARD_SIZE).fill(null));

  const setIthStoneKind = (i: number, stoneKind: boolean) => {
    setStoneKinds((prev) => {
      const newStoneKinds = [...prev];
      newStoneKinds[i] = stoneKind;
      return newStoneKinds;
    });
  }

  const curriedSetIthStoneKind = (i: number) => (stoneKind: boolean) => setIthStoneKind(i, stoneKind);

  const winner = calculateWinner(stoneKinds, BOARD_SIZE, !blackIsNext);
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
        style={{ minWidth: `${BOARD_SIZE * MINIMUM_CELL_SIZE}px` }}
      >
        <div
          className="grid border-2 border-black"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(${MINIMUM_CELL_SIZE}px, ${MAXIMUM_CELL_SIZE}px))`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(${MINIMUM_CELL_SIZE}px, ${MAXIMUM_CELL_SIZE}px))`,
            width: '100%',
            aspectRatio: '1',
          }}
        >
          {
            stoneKinds.map((stoneKind, index) => {
              const isRightCell = (index + 1) % BOARD_SIZE === 0;
              const isBottomCell = index >= BOARD_SIZE * (BOARD_SIZE - 1);
              const isBlankCell = stoneKind === null;
              return (
                <div
                  className={`border-black ${isRightCell ? '' : 'border-r'} ${isBottomCell ? '' : 'border-b'} ${isBlankCell ? 'hover:bg-slate-300' : ''}`}
                >
                  <Stone
                    stoneKind={stoneKind}
                    setStoneKind={curriedSetIthStoneKind(index)}
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

/**
 * Calculates the winner of the game based on the current state of the board.
 *
 * @param {(null | boolean)[]} stoneKinds - Array representing the state of each cell on the board. (null: empty, true: black, false: white)
 * @param {number} BOARD_SIZE - The size of the board (number of cells per row/column).
 * @param {boolean} blackPriority - Indicates if black has priority in case of a tie.
 *
 * @returns {null | string} The winner of the game ('Black' or 'White'), or null if there is no winner yet.
 */
const calculateWinner = (stoneKinds: (null | boolean)[], BOARD_SIZE: number, blackPriority: boolean): null | string => {

  type stoneCounter = {
    black: number,
    white: number,
    prev: null | boolean,
    continuous: number
  }

  const mergeStoneCounter = (counter1: stoneCounter, counter2: stoneCounter): stoneCounter => {
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
  for (let i = 0; i < BOARD_SIZE; i++) {
    grid.push(stoneKinds.slice(i * BOARD_SIZE, (i + 1) * BOARD_SIZE));
  }

  const rotationGrid = <T,>(grid: T[][]): T[][] => {
    return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
  }

  for (let i = 0; i < 4; i++) {
    // 縦横方向
    if (i < 2) {
      lines.push(...grid);
    }
    // 斜め方向（右下）
    for (let row = 0; row < BOARD_SIZE; row++) {
      lines.push([]);
      for (let d = 0; d < BOARD_SIZE; d++) {
        if (row + d < BOARD_SIZE) {
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

export default Board;
