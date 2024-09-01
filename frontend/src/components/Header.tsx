export default function Header() {
  return (
    <header>
      <div className="basis-2/5 flex items-center justify-between">
        <h1 className="font-bold text-slate-500 tracking-wide text-2xl">
          Quantum Gomoku
        </h1>
        <button className="font-bold text-slate-500 hover:text-slate-700">Login</button>
      </div>
    </header>
  );
}
