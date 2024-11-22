import React from "react";

type StoneProps = {
  stoneProbability: number | null;
  setStoneProbability: (stoneProbability: number) => void;
  changeTurn: () => void;
  turnCount: number;
  changeDisplayState: () => void;
}

/**
 * Stone component represents a single stone in the Gomoku game.
 *
 * @component
 * @param {number | null} stoneProbability - The probability of the stone's color for black.
 * @param {() => void} setStoneProbability - Function to set the probability of the stone's color for black.
 * @param {function} changeTurn - Function to change the turn to the next player.
 * @param {number} turnCount - The number of turns that have passed in the game.
 * @param {() => void} changeDisplayState - Function to change the display state of the game.
 *
 * @returns {JSX.Element} A button element representing the stone.
 */
const Stone: React.FC<StoneProps> = ({ stoneProbability, setStoneProbability, changeTurn, turnCount, changeDisplayState }) => {

  function onClick() {
    if (stoneProbability === null) {
      // 確率の設定の分岐が不十分なので、黒白それぞれ高低が必要
      if (turnCount % 4 == 0) {
        setStoneProbability(90);
      } else if (turnCount % 4 == 1) {
        setStoneProbability(10);
      } else if (turnCount % 4 == 2) {
        setStoneProbability(70);
      } else {
        setStoneProbability(30);
      }
      changeTurn();
      changeDisplayState();
      console.log("turnCount: ", turnCount);
    }
  }

  return (
    <button
      className="w-full h-full text-2xl font-bold leading-8 text-center"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {stoneProbability !== null && (
        <div className="w-[85%] h-[85%] border border-black rounded-full flex items-center justify-center"
          style={{ backgroundColor: `hsl(0, 0%, ${100 - stoneProbability}%)` }}
        >
          <div
            className="text-center text-[1vw]"
            style={{ color: stoneProbability >= 50 ? 'white' : 'black' }}
          >
            {Math.floor(stoneProbability / 10)}
          </div>
        </div>
      )}
    </button>
  );
}

export default Stone;
