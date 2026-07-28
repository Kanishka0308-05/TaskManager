import type { Task, TaskRequest } from '../types';
import { api } from './api';

export async function getTasks(): Promise<Task[]> {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
}

export async function createTask(task: TaskRequest): Promise<Task> {
  const body = task.userId ? { ...task, user: { id: task.userId } } : task;
  const response = await api.post<Task>('/tasks', body);
  return response.data;
}

export async function updateTask(id: number, task: TaskRequest): Promise<Task> {
  const response = await api.put<Task>(`/tasks/${id}`, task);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
