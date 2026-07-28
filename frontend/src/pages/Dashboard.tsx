import { useCallback, useEffect, useMemo, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import type { Task, TaskRequest } from '../types';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const totals = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.status === 'COMPLETED').length,
      pending: tasks.filter((task) => task.status !== 'COMPLETED').length,
    }),
    [tasks],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-lg shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Welcome back</p>
            <h2 className="text-3xl font-semibold text-white">Taskflow workspace</h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Manage tasks, track progress, and stay in control of your workflow. Use the task list below to review active work and maintain priorities.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/95 px-5 py-4 text-right shadow-inner shadow-slate-950/20 sm:px-8">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick summary</p>
            <p className="mt-2 text-3xl font-semibold text-white">Stay productive</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-sm shadow-slate-950/10">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total tasks</p>
          <p className="mt-4 text-4xl font-semibold text-white">{totals.total}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-sm shadow-slate-950/10">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Completed</p>
          <p className="mt-4 text-4xl font-semibold text-white">{totals.completed}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-sm shadow-slate-950/10">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Pending</p>
          <p className="mt-4 text-4xl font-semibold text-white">{totals.pending}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-sm shadow-slate-950/10">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Task list</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Active items</h3>
            </div>
            <p className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200">{tasks.length} tasks</p>
          </div>

          {error ? (
            <div className="rounded-3xl border border-rose-700/50 bg-rose-950/80 p-5 text-sm text-rose-100 shadow-sm shadow-rose-950/20">
              <p className="font-semibold">Unable to load tasks</p>
              <p className="mt-2 text-slate-300">{error}</p>
            </div>
          ) : null}

          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={(task) => {
              setSelectedTask(task);
              setFormMode('edit');
            }}
            onDelete={async (task) => {
              setError('');
              try {
                await deleteTask(task.id);
                setTasks((current) => current.filter((item) => item.id !== task.id));
              } catch (deleteError) {
                setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete task');
              }
            }}
          />
        </div>

        <div className="space-y-4">
          <TaskForm
            initialTask={formMode === 'edit' ? selectedTask : undefined}
            onSubmit={async (task) => {
              setError('');
              try {
                if (formMode === 'edit' && task.id) {
                  await updateTask(task.id, task as TaskRequest);
                } else {
                  await createTask(task as TaskRequest);
                }
                await loadTasks();
                setSelectedTask(undefined);
                setFormMode('create');
              } catch (submitError) {
                setError(submitError instanceof Error ? submitError.message : 'Unable to save task');
              }
            }}
            onCancel={() => {
              setSelectedTask(undefined);
              setFormMode('create');
            }}
          />
        </div>
      </section>
    </div>
  );
}
