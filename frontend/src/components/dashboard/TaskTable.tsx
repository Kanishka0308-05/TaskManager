import type { Task } from '../../types';

interface TaskTableProps {
  tasks: Task[];
  loading?: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const statusClasses: Record<Task['status'], string> = {
  TODO: 'bg-slate-700 text-slate-200',
  IN_PROGRESS: 'bg-sky-700 text-sky-100',
  REVIEW: 'bg-violet-700 text-violet-100',
  COMPLETED: 'bg-emerald-700 text-emerald-100',
  ARCHIVED: 'bg-amber-700 text-amber-100',
};

const priorityClasses: Record<Task['priority'], string> = {
  LOW: 'bg-slate-600 text-slate-100',
  MEDIUM: 'bg-cyan-600 text-cyan-100',
  HIGH: 'bg-orange-600 text-orange-100',
  CRITICAL: 'bg-rose-600 text-rose-100',
};

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function TaskTable({ tasks, loading = false, onEdit, onDelete }: TaskTableProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-700 shadow-sm shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-300 dark:shadow-slate-950/40">
        <p className="text-lg font-semibold text-slate-100">Loading tasks…</p>
        <p className="mt-2 text-sm">Please wait while your tasks are fetched.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-700 shadow-sm shadow-slate-950/10 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-300 dark:shadow-slate-950/40">
        <p className="text-lg font-semibold text-slate-100">No tasks found</p>
        <p className="mt-2 text-sm">Create a new task to see it listed here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/40">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-100 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-4 py-4">Title</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Priority</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Due Date</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t border-slate-800 transition hover:bg-slate-900/80">
                <td className="px-4 py-4">
                  <div className="font-semibold text-slate-950 dark:text-white">{task.title}</div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{task.description || 'No description'}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${statusClasses[task.status]}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${priorityClasses[task.priority]}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{task.category?.name ?? '—'}</td>
                <td className="px-4 py-4 text-slate-300">{formatDate(task.dueDate)}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(task)}
                      className="rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-600 hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(task)}
                      className="rounded-2xl border border-rose-500 bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
