import { NavLink } from 'react-router-dom';
import { Home, ListChecks, Settings, X } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { label: 'Dashboard', icon: Home, to: '/', disabled: false },
  { label: 'Tasks', icon: ListChecks, to: '/', disabled: true },
  { label: 'Settings', icon: Settings, to: '/', disabled: true },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto rounded-r-[2rem] border-r border-slate-200 bg-white/95 p-5 shadow-xl shadow-slate-950/10 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-950/40 md:static md:translate-x-0 md:border-r-0 md:rounded-r-none ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Taskflow Pro</p>
          <h2 className="text-xl font-semibold text-white">Workspace</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 transition hover:border-slate-700 md:hidden"
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.disabled) {
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-500"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
            );
          }
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-lg shadow-slate-950/20'
                    : 'border border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-400 shadow-inner shadow-slate-950/20">
        <p className="mb-2 uppercase tracking-[0.24em] text-slate-500">Hint</p>
        <p>Use the dashboard for overview and the task list to manage items in the current view.</p>
      </div>
    </aside>
  );
}
