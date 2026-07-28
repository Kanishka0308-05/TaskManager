import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div>
        <div className="mb-6 text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">Navigation</div>
        <nav className="space-y-2 text-sm text-slate-300">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 transition ${
                isActive ? 'bg-slate-800 text-white shadow-lg shadow-slate-950/20' : 'hover:bg-slate-800/80 hover:text-white'
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-400 shadow-inner shadow-slate-950/20">
        <p className="mb-2 text-xs uppercase tracking-[0.24em] text-slate-500">Pro tip</p>
        <p>Use the sidebar to expand the app with task views and boards in the next phase.</p>
      </div>
    </div>
  );
}
