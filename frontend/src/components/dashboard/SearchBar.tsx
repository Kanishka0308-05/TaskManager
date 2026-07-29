import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/40">
      <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search tasks by title..."
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </label>
    </div>
  );
}
