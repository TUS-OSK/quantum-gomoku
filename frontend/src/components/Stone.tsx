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
      className="text-2xl font-bold leading-8 p-0 text-center border"
      onClick={onClick}
      style={{ width: '100%', height: '100%' }}
    >
      {stoneKind}
    </button>
  );
}