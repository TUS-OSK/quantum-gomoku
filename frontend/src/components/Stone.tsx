import React from "react";

type StoneProps = {
  stoneKind: boolean | null;
  setStoneKind: (stoneKind: boolean | null) => void;
  changeTurn: () => void;
  blackIsNext: boolean;
}

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
