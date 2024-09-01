import Stone from './Stone';

const BoardSize = 19;

export default function Board() {
  return (
    <>
      {Array(BoardSize).fill(0).map((_, row) => (
        <div className="clear-both table" key={row}>
          {Array(BoardSize).fill(0).map((_, col) => (
            <Stone
              key={row * BoardSize + col}
            />
          ))}
        </div>
      ))}
    </>
  );
}
