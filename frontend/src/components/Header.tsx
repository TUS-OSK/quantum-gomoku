export default function Header() {
  return (
    <header>
      <div className="basis-2/5 flex items-center justify-between">
        <h1 className="font-bold text-black tracking-wide text-2xl">
          Quantum Gomoku
        </h1>
        <button className="font-bold m-5 p-2 bg-black text-white rounded hover:bg-gray-600">LOGIN</button>
      </div>
    </header>
  );
}
