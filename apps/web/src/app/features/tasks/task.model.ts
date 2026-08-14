export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  dueDate: string;
}

export type CreateTaskRequest = Pick<Task, 'title' | 'description' | 'assignee' | 'dueDate'>;

export interface TaskSummary {
  todo: number;
  inProgress: number;
  done: number;
}
