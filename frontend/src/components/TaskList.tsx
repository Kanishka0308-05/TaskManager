import type { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export default function TaskList({ tasks, loading = false, onEdit, onDelete }: TaskListProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/95 p-8 text-center text-slate-400 shadow-sm shadow-slate-950/10">
        <p className="text-lg font-semibold text-slate-100">Loading tasks…</p>
        <p className="mt-2 text-sm">Please wait while your tasks are being prepared.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/95 p-8 text-center text-slate-400 shadow-sm shadow-slate-950/10">
        <p className="text-lg font-semibold text-slate-100">No tasks yet</p>
        <p className="mt-2 text-sm">Create your first task to start tracking progress.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
