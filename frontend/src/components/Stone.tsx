import { useState } from 'react';

export interface StoneProps {
  changeTurn: () => void;
  blackIsNext: boolean;
}

export default function Stone({ changeTurn, blackIsNext }: StoneProps) {
  const [stoneKind, setStoneKind] = useState<boolean | null>(null);

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
          className={`w-[85%] h-[85%] border border-black rounded-full ${stoneKind ? 'bg-white' : 'bg-black'}`}
        ></div>
      )}
    </button>
  );
}