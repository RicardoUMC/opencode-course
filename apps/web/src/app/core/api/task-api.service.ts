import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskRequest, Task, TaskStatus, TaskSummary } from '../../features/tasks/task.model';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private readonly http: HttpClient) {}

  listTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  createTask(request: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, request);
  }

  getSummary(): Observable<TaskSummary> {
    return this.http.get<TaskSummary>(`${this.baseUrl}/tasks/summary`);
  }

  changeStatus(taskId: string, status: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${taskId}/status`, { status });
  }
}
