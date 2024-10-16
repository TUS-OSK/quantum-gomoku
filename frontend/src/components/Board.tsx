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
  // 盤面の人マスのサイズの最大・最小
  // [WYH]
  // 盤面状況（空のとき）やwindowサイズによってレイアウトがつぶれてしまうため
  // CSS苦手なのでより良い方法があれば、変更して欲しい
  const MINIMUM_CELL_SIZE_PX = 20;
  const MAXIMUM_CELL_SIZE_PX = 50;

  // 盤面の石を一次元配列で管理 ( null: 空, true: 黒, false: 白 )
  // [WHY]
  // Q: Stone コンポーネントにstoneStateを持たせるべきでは？
  // A: 勝敗判定を行うには、Stone コンポーネントの全ての状態を統括的に親コンポーネントで管理する必要があるため。
  // Q: [stoneKind, setStoneKind] = useState<> を要素とした配列を持つべきでは？
  // A: useStateはトップレベルでしか呼び出せないため、Stone コンポーネントの数だけloopやcallbackでuseStateを呼び出すことができない。
  const [stoneKinds, setStoneKinds] = useState<(null | boolean)[]>(Array(BOARD_SIZE * BOARD_SIZE).fill(null));

  const setIthStoneKind = (i: number, stoneKind: boolean) => {
    setStoneKinds((prev) => {
      const newStoneKinds = [...prev];
      newStoneKinds[i] = stoneKind;
      return newStoneKinds;
    });
  }
  // Stone コンポーネントに渡すため、カリー化
  const curriedSetIthStoneKind = (i: number) => (stoneKind: boolean) => setIthStoneKind(i, stoneKind);

  // stoneKindsを引数もつため、石が置かれるたびに下行が実行され勝敗判定が行われる
  // [WHY]
  // 量子五目並べでは両者5目並ぶことがあるため、どちらを優先するかを決める必要がある
  // 量子化を想定して関数に優先順位を引数として渡している（現状は置いた人を優先）
  // [TODO]
  // 勝敗確定時に石を置けないようにする
  const winner = calculateWinner(stoneKinds, BOARD_SIZE, !blackIsNext);

  return (
    <>
      {/* 現在の手番の状況 */}
      <div className="mb-5 flex justify-center items-center text-2xl font-bold">
        {winner === null ? `Next player: ${blackIsNext ? 'Black' : 'White'}` : `Winner: ${winner}`}
      </div>
      {/* 盤面を適切に中央へ配置するdiv */}
      <div
        className="flex justify-center items-center"
        style={{ minWidth: `${BOARD_SIZE * MINIMUM_CELL_SIZE_PX}px` }}
      >
        {/* 盤面をcssのgridで作成 */}
        <div
          className="grid border-2 border-black"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(${MINIMUM_CELL_SIZE_PX}px, ${MAXIMUM_CELL_SIZE_PX}px))`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(${MINIMUM_CELL_SIZE_PX}px, ${MAXIMUM_CELL_SIZE_PX}px))`,
            width: '100%',
            aspectRatio: '1',
          }}
        >
          {
            stoneKinds.map((stoneKind, index) => {
              // 罫線描画時に右端と下端の線は外枠と被るため、それぞれのセルに対して右端と下端の線を描画しない
              const isRightCell = (index + 1) % BOARD_SIZE === 0;
              const isBottomCell = index >= BOARD_SIZE * (BOARD_SIZE - 1);
              // 石を置けるセルはhover時に色を変える
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

  // 各line毎に連続する石の数をカウントする
  type stoneCounter = {
    blackCntMax: number,  // 黒の連続数の最大値
    whiteCntMax: number,  // 白の連続数の最大値
    prevKind: null | boolean, // 前の石の種類
    continuous: number  // 現在の連続数
  }

  // 二つのstoneCounterをマージする関数
  const mergeStoneCounter = (counter1: stoneCounter, counter2: stoneCounter): stoneCounter => {
    return {
      blackCntMax: Math.max(counter1.blackCntMax, counter2.blackCntMax),
      whiteCntMax: Math.max(counter1.whiteCntMax, counter2.whiteCntMax),
      prevKind: null,
      continuous: 0,
    }
  }

  // lineの石の並びから連続する石の数をカウントする関数
  const calculateCounterFromLine = (line: (boolean | null)[]): stoneCounter => {
    return line.reduce((accCnt: stoneCounter, curKind: boolean | null) => {
      if (curKind === null) {
        return { blackCntMax: accCnt.blackCntMax, whiteCntMax: accCnt.whiteCntMax, prevKind: null, continuous: 0 };
      }
      return {
        blackCntMax: curKind && accCnt.prevKind === curKind ? Math.max(accCnt.continuous + 1, accCnt.blackCntMax) : Math.max(accCnt.blackCntMax, 1),
        whiteCntMax: !curKind && accCnt.prevKind === curKind ? Math.max(accCnt.continuous + 1, accCnt.whiteCntMax) : Math.max(accCnt.whiteCntMax, 1),
        prevKind: curKind,
        continuous: accCnt.prevKind === curKind ? accCnt.continuous + 1 : 1,
      };
    }, { blackCntMax: 0, whiteCntMax: 0, prevKind: null, continuous: 0 });
  }

  // [INFO] ここのgrid -> linesの処理は切り出した方が良いかもしれない、が、他で呼び出す予定がないためそのまま記載
  const boardAllLines: (boolean | null)[][] = [];

  // 後のline分割処理を明瞭に記載するため、二次元配列に変換
  let grid: (boolean | null)[][] = Array.from({ length: BOARD_SIZE }, (_, i) => stoneKinds.slice(i * BOARD_SIZE, (i + 1) * BOARD_SIZE));

  // 右に90度回転する関数
  const rotationGrid = <T,>(grid: T[][]): T[][] => {
    return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
  }

  // 宣言型に直せるが、可読性が落ちるためfor文で記載
  for (let i = 0; i < 4; i++) {
    // 縦横方向
    if (i < 2) {
      boardAllLines.push(...grid);
    }
    // 斜め方向（右下）
    // 0行目から順に右下方向にlineを作成するのを4辺から行うと、全ての斜め方向lineを網羅できる
    for (let row = 0; row < BOARD_SIZE; row++) {
      boardAllLines.push([]);
      for (let d = 0; d < BOARD_SIZE; d++) {
        if (row + d < BOARD_SIZE) {
          boardAllLines[boardAllLines.length - 1].push(grid[row + d][d]);
        } else {
          break;
        }
      }
    }
    grid = rotationGrid(grid);
  }

  // 盤面上の全てのlineに対してCountし、最大値を取得
  const mergedCounter: stoneCounter = boardAllLines.map(calculateCounterFromLine).reduce(mergeStoneCounter);

  if (mergedCounter.blackCntMax >= 5 && mergedCounter.whiteCntMax >= 5) {
    // 両者5目以上ならんでいる場合、優先順位に従って勝者を決定
    return blackPriority ? 'Black' : 'White';
  } else if (mergedCounter.blackCntMax >= 5) {
    return 'Black';
  } else if (mergedCounter.whiteCntMax >= 5) {
    return 'White';
  } else {
    return null;
  }

}

export default Board;
