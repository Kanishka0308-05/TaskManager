import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

const statusStyles: Record<Task['status'], string> = {
  TODO: 'bg-slate-700 text-slate-200',
  IN_PROGRESS: 'bg-sky-700 text-sky-100',
  REVIEW: 'bg-violet-700 text-violet-100',
  COMPLETED: 'bg-emerald-700 text-emerald-100',
  ARCHIVED: 'bg-amber-700 text-amber-100',
};

const priorityStyles: Record<Task['priority'], string> = {
  LOW: 'bg-slate-600 text-slate-100',
  MEDIUM: 'bg-cyan-600 text-cyan-100',
  HIGH: 'bg-orange-600 text-orange-100',
  CRITICAL: 'bg-rose-600 text-rose-100',
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-950/95 p-5 shadow-sm shadow-slate-950/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${statusStyles[task.status]}`}>
              {task.status.replace('_', ' ')}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${priorityStyles[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{task.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">{task.description}</p>
          </div>
        </div>
        <div className="shrink-0 text-right text-sm text-slate-500">
          <p>Created</p>
          <p className="mt-2 font-semibold text-slate-200">{formatDate(task.createdAt)}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onEdit?.(task)}
          className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(task)}
          className="rounded-2xl border border-rose-500 bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
