import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  status: string;
  priority: string;
  category: string;
  categories: string[];
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const statusOptions = ['All', 'TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'ARCHIVED'];
const priorityOptions = ['All', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export default function FilterBar({
  status,
  priority,
  category,
  categories,
  onStatusChange,
  onPriorityChange,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/40">
      <div className="mb-4 flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-3 text-slate-900 dark:bg-slate-900/90 dark:text-slate-200">
        <SlidersHorizontal className="h-5 w-5 text-sky-400" />
        <div>
          <p className="text-sm font-semibold text-white">Filters</p>
          <p className="text-xs text-slate-500">Refine tasks by status, priority, and category.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-sm text-slate-300">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">Status</span>
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option === 'All' ? 'All statuses' : option.replace('_', ' ')}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">Priority</span>
          <select
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option === 'All' ? 'All priorities' : option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-slate-500">Category</span>
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
          >
            <option value="All" className="text-slate-900">All categories</option>
            {categories.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
