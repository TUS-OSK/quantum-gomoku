export interface StoneProps {
  value: string | null;
  onStoneClick: () => void;
}

export default function Stone({ value, onStoneClick }: StoneProps) {
  return (
    <button
      className="float-left text-2xl font-bold leading-8 h-8 -mr-px -mt-px p-0 text-center w-8 border"
      onClick={onStoneClick}
    >{value}
    </button>
  );
}
