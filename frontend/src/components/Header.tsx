export default function Header() {
  return (
    <header>
      <div className="basis-2/5 flex items-center justify-between">
        <h1 className="font-bold text-black tracking-wide text-2xl">
          Quantum Gomoku
        </h1>
        <button className="font-bold bg-black text-white hover:bg-gray-600">LOGIN</button>
      </div>
    </header>
  );
}
