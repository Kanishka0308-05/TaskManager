import { useCallback, useEffect, useMemo, useState } from 'react';
import { Activity, CheckCircle2, Layers, Percent } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskTable from '../components/dashboard/TaskTable';
import SearchBar from '../components/dashboard/SearchBar';
import FilterBar from '../components/dashboard/FilterBar';
import StatCard from '../components/dashboard/StatCard';
import { useToast } from '../components/toast/ToastProvider';
import type { Task, TaskRequest } from '../types';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService';

export default function Dashboard() {
  const { notify } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Unable to load tasks';
      setError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const totals = useMemo(
    () => {
      const total = tasks.length;
      const completed = tasks.filter((task) => task.status === 'COMPLETED').length;
      const pending = total - completed;
      const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);
      return { total, completed, pending, completionPercentage };
    },
    [tasks],
  );

  const categories = useMemo(() => {
    const unique = tasks
      .map((task) => task.category?.name)
      .filter((name): name is string => typeof name === 'string' && name.trim().length > 0);
    return Array.from(new Set(unique));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = searchQuery.trim()
        ? task.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
        : true;
      const matchesStatus = statusFilter === 'All' ? true : task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' ? true : task.priority === priorityFilter;
      const matchesCategory =
        categoryFilter === 'All'
          ? true
          : task.category?.name?.toLowerCase() === categoryFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter]);

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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={totals.total}
          description="All tasks fetched from the backend."
          icon={Layers}
          accentClass="bg-sky-500 text-white"
        />
        <StatCard
          title="Completed"
          value={totals.completed}
          description="Tasks marked as completed."
          icon={CheckCircle2}
          accentClass="bg-emerald-500 text-white"
        />
        <StatCard
          title="Pending"
          value={totals.pending}
          description="Tasks that still need attention."
          icon={Activity}
          accentClass="bg-amber-500 text-white"
        />
        <StatCard
          title="Completion"
          value={`${totals.completionPercentage}%`}
          description="Percentage of tasks completed so far."
          icon={Percent}
          accentClass="bg-violet-500 text-white"
        />
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

          <div className="space-y-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterBar
              status={statusFilter}
              priority={priorityFilter}
              category={categoryFilter}
              categories={categories}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              onCategoryChange={setCategoryFilter}
            />
          </div>
          <TaskTable
            tasks={filteredTasks}
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
                notify('Task deleted successfully.', 'success');
              } catch (deleteError) {
                const message = deleteError instanceof Error ? deleteError.message : 'Unable to delete task';
                setError(message);
                notify(message, 'error');
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
                  notify('Task updated successfully.', 'success');
                } else {
                  await createTask(task as TaskRequest);
                  notify('Task created successfully.', 'success');
                }
                await loadTasks();
                setSelectedTask(undefined);
                setFormMode('create');
              } catch (submitError) {
                const message = submitError instanceof Error ? submitError.message : 'Unable to save task';
                setError(message);
                notify(message, 'error');
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
