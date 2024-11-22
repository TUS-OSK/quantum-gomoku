import React from "react";

type StoneProps = {
  stoneProbability: number | null;
  setStoneProbability: (stoneProbability: number) => void;
  changeTurn: () => void;
  blackIsNext: boolean;
}

/**
 * Stone component represents a single stone in the Gomoku game.
 *
 * @component
 * @param {number | null} stoneProbability - The probability of the stone's color for black.
 * @param {() => void} setStoneProbability - Function to set the probability of the stone's color for black.
 * @param {function} changeTurn - Function to change the turn to the next player.
 * @param {boolean} blackIsNext - Boolean indicating if the next stone to be placed is black.
 *
 * @returns {JSX.Element} A button element representing the stone.
 */
const Stone: React.FC<StoneProps> = ({ stoneProbability, setStoneProbability, changeTurn, blackIsNext }) => {

  function onClick() {
    if (stoneProbability === null) {
      // 確率の設定の分岐が不十分なので、黒白それぞれ高低が必要
      if (blackIsNext) {
        setStoneProbability(70);
      } else {
        setStoneProbability(30);
      }
      changeTurn();
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
        <div
          className={`w-[85%] h-[85%] border border-black rounded-full`}
          style={{ backgroundColor: `hsl(0, 0%, ${100 - stoneProbability}%)` }}
        >
          {stoneProbability !== null && (
          <div
            style={{
            color: `hsl(0, 0%, ${stoneProbability}%)`, fontSize: '0.5rem',
          }}
          >
            {stoneProbability}
            </div>
          )}
        </div>
      )}
    </button>
  );
}

export default Stone;
