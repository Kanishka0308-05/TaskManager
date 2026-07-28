export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 px-4 py-4 shadow-sm shadow-slate-950/10 backdrop-blur lg:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Task Manager</p>
          <h1 className="text-2xl font-semibold text-white">Taskflow Dashboard</h1>
        </div>
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-300 shadow-inner shadow-slate-950/20 sm:flex">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span>Connected</span>
        </div>
      </div>
    </header>
  );
}
