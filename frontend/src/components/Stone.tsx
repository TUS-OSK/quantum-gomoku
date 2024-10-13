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
      className="float-left text-2xl font-bold leading-8 h-8 -mr-px -mt-px p-0 text-center w-8 border"
      onClick={onClick}
    >
      {stoneKind}
    </button>
  );
}
