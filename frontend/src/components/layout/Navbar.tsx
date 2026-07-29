import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm shadow-slate-950/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-950 transition hover:border-slate-300 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Task Manager</p>
            <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Taskflow Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 shadow-inner shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:flex">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
}
