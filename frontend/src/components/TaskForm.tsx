import { useMemo, useState } from 'react';
import type { Task, TaskPriority, TaskStatus } from '../types';

const statusOptions: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'ARCHIVED'];
const priorityOptions: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

interface TaskFormProps {
  initialTask?: Partial<Task>;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'> & { id?: number }) => void;
  onCancel?: () => void;
}

export default function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? 'TODO');
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'MEDIUM');

  const formValid = useMemo(() => title.trim().length >= 3 && description.trim().length >= 5, [title, description]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!formValid) return;
        onSubmit({
          id: initialTask?.id,
          title: title.trim(),
          description: description.trim(),
          status,
          priority,
        });
      }}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-slate-950/40"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Task editor</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Add a new task</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-100">Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Issue tracking update"
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
            required
            minLength={3}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-100">Priority</span>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value as TaskPriority)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
          >
            {priorityOptions.map((option) => (
              <option key={option} value={option} className="text-slate-900 dark:text-slate-100">
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-300">
        <span className="font-semibold text-slate-100">Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          placeholder="Describe the task in a few sentences"
          className="w-full rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
          required
          minLength={5}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-100">Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatus)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-950 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option} className="text-slate-900 dark:text-slate-100">
                {option.replace('_', ' ')}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formValid}
            className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:bg-sky-400"
          >
            Save task
          </button>
        </div>
      </div>
    </form>
  );
}
