import React from "react";

type StoneProps = {
  stoneKind: boolean | null;
  setStoneKind: (stoneKind: boolean | null) => void;
  changeTurn: () => void;
  blackIsNext: boolean;
}

/**
 * Stone component represents a single stone in the Gomoku game.
 *
 * @component
 * @param {boolean | null} stoneKind - The kind of the stone, `true` for black, `false` for white, and `null` for no stone.
 * @param {function} setStoneKind - Function to set the kind of the stone.
 * @param {function} changeTurn - Function to change the turn to the next player.
 * @param {boolean} blackIsNext - Boolean indicating if the next stone to be placed is black.
 *
 * @returns {JSX.Element} A button element representing the stone.
 */
const Stone: React.FC<StoneProps> = ({ stoneKind, setStoneKind, changeTurn, blackIsNext }) => {

  function onClick() {
    if (stoneKind === null) {
      setStoneKind(blackIsNext);
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
      {stoneKind !== null && (
        <div
          className={`w-[85%] h-[85%] border border-black rounded-full ${stoneKind ? 'bg-black' : 'bg-white'}`}
        ></div>
      )}
    </button>
  );
}

export default Stone;
