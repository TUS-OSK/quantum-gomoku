import React, { useState } from 'react';
import Stone from './Stone';
import CpuNextHand from './CpuNextHand';

type BoardProps = {
  BOARD_SIZE: number;
  turnCount: number;
  changeTurn: () => void;
}

/**
 * Board component for the Quantum Gomoku game.
 *
 * @component
 * @param {number} BOARD_SIZE - The size of the board (number of cells per row/column).
 * @param {number} turnCount - The number of turns that have passed in the game.
 * @param {() => void} changeTurn - Function to change the turn to the next player.
 *
 * @returns {JSX.Element} The rendered Board component.
 *
 * @example
 * return (
 *  <Board BOARD_SIZE={19} blackIsNext={true} changeTurn={handleChangeTurn} />
 * )
 */
const Board: React.FC<BoardProps> = ({ BOARD_SIZE, turnCount, changeTurn }) => {
  // 盤面の人マスのサイズの最大・最小
  // [WYH]
  // 盤面状況（空のとき）やwindowサイズによってレイアウトがつぶれてしまうため
  // CSS苦手なのでより良い方法があれば、変更して欲しい
  const MINIMUM_CELL_SIZE_PX = 20;
  const MAXIMUM_CELL_SIZE_PX = 50;

  const blackIsNext = turnCount % 2 === 0;

  const [displayState, setDisplayState] = useState<number>(0);

  // 盤面の石を一次元配列で管理 ( null: 空, true: 黒, false: 白 )
  // [WHY]
  // Q: Stone コンポーネントにstoneStateを持たせるべきでは？
  // A: 勝敗判定を行うには、Stone コンポーネントの全ての状態を統括的に親コンポーネントで管理する必要があるため。
  // Q: [stoneKind, setStoneKind] = useState<> を要素とした配列を持つべきでは？
  // A: useStateはトップレベルでしか呼び出せないため、Stone コンポーネントの数だけloopやcallbackでuseStateを呼び出すことができない。
  // 石の確率を管理
  const [stoneProbabilities, setStoneProbabilities] = useState<(null | number)[]>(Array(BOARD_SIZE * BOARD_SIZE).fill(null));

  const setIthStoneProbability = (i: number, probability: number) => {
    setStoneProbabilities((prev) => {
      const newStoneProbabilities = [...prev];
      newStoneProbabilities[i] = probability;
      return newStoneProbabilities;
    })
  }
  // Stone コンポーネントに渡すため、カリー化
  const curriedSetIthStoneProbability = (i: number) => (probability: number) => setIthStoneProbability(i, probability);

  // stoneKindsを引数もつため、石が置かれるたびに下行が実行され勝敗判定が行われる
  // [WHY]
  // 量子五目並べでは両者5目並ぶことがあるため、どちらを優先するかを決める必要がある
  // 量子化を想定して関数に優先順位を引数として渡している（現状は置いた人を優先）
  // [TODO]
  // 勝敗確定時に石を置けないようにする

  const [winner, setWinner] = useState<null | string>(null);

  const [observedStoneKinds, setObservedStoneKinds] = useState<(null | boolean)[]>(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [isObserved, setIsObserved] = useState<boolean>(false);

  const observation = () => {
    const [newWinner, newObsevedStoneKinds] = calculateWinner(stoneProbabilities, BOARD_SIZE, !blackIsNext);
    setIsObserved(true);
    setWinner(newWinner);
    setObservedStoneKinds(newObsevedStoneKinds);
  }
  const nextStoneProbability = turnCount % 4 == 0 ? 90 : turnCount % 4 == 1 ? 10 : turnCount % 4 == 2 ? 70 : 30;

  const playCPU = async () => {
    const cpuHand = CpuNextHand({ stoneProbabilities, boardSize: BOARD_SIZE, nextStoneProbability: nextStoneProbability });
    await new Promise(r => setTimeout(r, 1000));
    setIthStoneProbability(cpuHand, nextStoneProbability);
    changeTurn();
    setDisplayState(0);
  }

  return (
    <>
      <div className='flex flex-row'>

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
              stoneProbabilities.map((stoneProbability, index) => {
                // 罫線描画時に右端と下端の線は外枠と被るため、それぞれのセルに対して右端と下端の線を描画しない
                const isRightCell = (index + 1) % BOARD_SIZE === 0;
                const isBottomCell = index >= BOARD_SIZE * (BOARD_SIZE - 1);
                // 石を置けるセルはhover時に色を変える
                const isBlankCell = isObserved ? false : stoneProbability === null;
                return (
                  <div
                    className={`border-black ${isRightCell ? '' : 'border-r'} ${isBottomCell ? '' : 'border-b'} ${isBlankCell ? 'hover:bg-slate-300' : ''}`}
                  >
                    {
                      isObserved ? (
                        <Stone
                          stoneProbability={observedStoneKinds[index]}
                          setStoneProbability={() => { }}
                          changeTurn={() => { }}
                          turnCount={turnCount}
                          changeDisplayState={() => { }}
                        />

                      ) : (
                        <Stone
                          stoneProbability={stoneProbability}
                          setStoneProbability={curriedSetIthStoneProbability(index)}
                          changeTurn={changeTurn}
                          turnCount={turnCount}
                          changeDisplayState={() => setDisplayState(1)}
                        />
                      )

                    }

                  </div>
                );
              })
            }
          </div>
        </div>
        {/* 現在の状況 */}
        <div className='flex flex-col items-center justify-center ml-[100px] w-[35%]'>
          {/* 現在の手番の状況 */}
          <div className="mb-2 flex justify-center items-center text-3xl font-bold">
            {winner === null ? `${(blackIsNext ? 'あなた（黒）' : 'CPU（白）') + 'の手番です'}` : `勝者: ${winner}`}
          </div>
          {
            displayState === 0 ? ( // プレーヤーが石を置く状態
              <>
                <div className='mb-5 flex justify-center items-center text-3xl font-bold'>
                  石を置いてください
                </div>
                <div className='mb-5 flex justify-center items-center text-xl font-bold'>
                  {`次に置く石の確率: ${nextStoneProbability}%`}
                </div>
              </>
            ) : displayState === 1 ? ( // プレーヤーが石を置いた状態
              <>
                <div className='flex justify-center items-center text-3xl font-bold'>
                  観測しますか？
                </div>
                <div className="w-full max-w-2xl mx-auto mt-10">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex w-full items-center">
                      <div className="flex-1 flex flex-col items-center gap-8">
                        <button className="w-[100px] h-[100px] text-2xl font-medium bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={() => { observation(); setDisplayState(2); }}>
                          する
                        </button>
                      </div>
                      <div className="w-px h-32 bg-gray-300 mx-4"></div>
                      <div className="flex-1 flex flex-col items-center gap-8">
                        <button className="w-[100px] h-[100px] text-2xl font-medium bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          onClick={() => { setDisplayState(3); playCPU(); }}>
                          しない
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : displayState === 2 ? ( // 観測した状態
              <>
                {winner === null ? (
                  <>
                    <div className='mb-5 flex justify-center items-center text-3xl font-bold'>
                      勝敗が決まりませんでした。
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="w-[100px] h-[80px] text-2xl font-medium bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={() => { setDisplayState(3); setIsObserved(false); playCPU(); }}>
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='mb-5 flex justify-center items-center text-3xl font-bold'>
                      勝者: {winner}
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="w-[100px] h-[80px] text-2xl font-medium bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={() => setDisplayState(3)}>
                        Next
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : ( // CPUのターン
              <div>
                <div className='mb-5 flex justify-center items-center text-3xl font-bold'>
                  少々お待ちください
                </div>
                <div className='mb-5 flex justify-center items-center text-xl font-bold'>
                  {`次に置く石の確率: ${nextStoneProbability}%`}
                </div>
              </div>
            )}
        </div>
      </div >

    </>
  );
}

/**
 * Calculates the winner of the game based on the current state of the board.
 *
 * @param {(null | number)[]} stoneProbabilities - Array representing the state of each cell on the board. (null: empty, true: black, false: white)
 * @param {number} BOARD_SIZE - The size of the board (number of cells per row/column).
 * @param {boolean} blackPriority - Indicates if black has priority in case of a tie.
 *
 * @returns {null | string, (null | boolean)[]} A tuple containing the winner of the game and the state of each cell on the board.
 */
const calculateWinner = (stoneProbabilities: (null | number)[], BOARD_SIZE: number, blackPriority: boolean): [null | string, (null | boolean)[]] => {

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
    // 連続する石の数を更新する関数
    const updateStoneCount = (isCurrentKind: boolean, isSamePreviousKind: boolean | null, maxCount: number, continuousCount: number): number => {
      if (isSamePreviousKind) {
        return Math.max(maxCount, continuousCount + 1);
      } else if (isCurrentKind) {
        return Math.max(maxCount, 1);
      } else {
        return maxCount;
      }
    };

    return line.reduce((accumulator: stoneCounter, currentKind: boolean | null) => {
      if (currentKind === null) {
        // 石がない場合、連続カウントをリセット
        return { ...accumulator, prevKind: null, continuous: 0 };
      }

      // 黒石と白石の連続カウントを更新
      const newBlackCount = updateStoneCount(currentKind, currentKind == accumulator.prevKind, accumulator.blackCntMax, accumulator.continuous);
      const newWhiteCount = updateStoneCount(!currentKind, currentKind == accumulator.prevKind, accumulator.whiteCntMax, accumulator.continuous);

      return {
        blackCntMax: newBlackCount,
        whiteCntMax: newWhiteCount,
        prevKind: currentKind,
        continuous: accumulator.prevKind === currentKind ? accumulator.continuous + 1 : 1,
      };
    }, { blackCntMax: 0, whiteCntMax: 0, prevKind: null, continuous: 0 });
  };

  // 盤面上の全てのlineを取得する関数
  // [WARNING] 対角線のみダブルカウントしている
  const getAllLines = (stoneKinds: (boolean | null)[]): (boolean | null)[][] => {
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
    return boardAllLines;
  }

  // 盤面上の全てのlineを取得し、それぞれのlineに対して数え上げをO(N)で行うため、全体の計算量はO(N^2)
  // ただ、N: BORAD_SIZEに対して定数倍が大きいので注意。（実際の計算量はO(4N^2)程度）
  // 参考：N=19のとき、line数=114, line中の石数=1482
  const observedStoneKinds = stoneProbabilities.map((probability) => {
    if (probability === null) {
      return null;
    } else {
      return Math.random() <= probability / 100;
    }
  });
  const mergedCounter: stoneCounter = getAllLines(observedStoneKinds).map(calculateCounterFromLine).reduce(mergeStoneCounter);

  const isBlackWin = mergedCounter.blackCntMax >= 5;
  const isWhiteWin = mergedCounter.whiteCntMax >= 5;
  const isTie = isBlackWin && isWhiteWin;

  // 勝敗判定
  if (isTie) {
    return [blackPriority ? 'Black' : 'White', observedStoneKinds]; // 優先順位によって勝者を決定
  } else if (isBlackWin) {
    return ['Black', observedStoneKinds];
  } else if (isWhiteWin) {
    return ['White', observedStoneKinds];
  } else {
    return [null, observedStoneKinds];
  }
}

export default Board;
