import { useState } from 'react';

export interface StoneProps {
  changeTurn: () => void;
  xIsNext: boolean;
}

export default function Stone({ changeTurn, xIsNext }: StoneProps) {
  const [stoneKind, setStoneKind] = useState<string | null>(null);

  function onClick() {
    if (stoneKind === null) {
      setStoneKind(xIsNext ? 'X' : 'O');
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
      {stoneKind && (
        <div
          className={`w-[85%] h-[85%] border border-black rounded-full ${stoneKind === 'X' ? 'bg-white' : 'bg-black'}`}
        ></div>
      )}
    </button>
  );
}