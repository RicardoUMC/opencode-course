import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskApiService } from '../../core/api/task-api.service';
import { CreateTaskRequest, Task, TaskStatus, TaskSummary } from './task.model';
import { TaskFormComponent } from './task-form.component';
import { TaskSummaryComponent } from './task-summary.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent, TaskSummaryComponent],
  template: `
    <app-task-summary [summary]="summary" />
    <app-task-form (createTask)="addTask($event)" />

    <section class="toolbar">
      <label for="statusFilter">Filter by status</label>
      <select id="statusFilter" [(ngModel)]="selectedStatus">
        <option value="all">All</option>
        <option value="todo">To do</option>
        <option value="in_progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </section>

    <p class="message" *ngIf="message">{{ message }}</p>
    <p *ngIf="loading">Loading tasks...</p>

    <section class="task-list" *ngIf="!loading">
      <article class="task-card" *ngFor="let task of filteredTasks">
        <div>
          <h2>{{ task.title }}</h2>
          <p>{{ task.description }}</p>
        </div>
        <dl>
          <dt>Assignee</dt><dd>{{ task.assignee }}</dd>
          <dt>Status</dt><dd>{{ task.status }}</dd>
          <dt>Due date</dt><dd>{{ task.dueDate }}</dd>
        </dl>
        <button type="button" (click)="markDone(task)">Mark done</button>
      </article>
    </section>
  `,
  styles: [`
    .toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .message { color: #047857; font-weight: 700; }
    .task-list { display: grid; gap: 16px; }
    .task-card { display: grid; grid-template-columns: 1fr auto auto; gap: 20px; align-items: center; padding: 18px; border: 1px solid #d9dee8; border-radius: 12px; background: #fff; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08); }
    .task-card h2 { margin: 0 0 8px; }
    .task-card p, .task-card dl, .task-card dd { margin: 0; }
    .task-card dl { display: grid; grid-template-columns: auto auto; gap: 4px 10px; }
    .task-card dt { color: #6b7280; }
    .task-card button { border: 0; border-radius: 999px; padding: 10px 14px; background: #2563eb; color: #fff; cursor: pointer; }
    @media (max-width: 700px) { .task-card { grid-template-columns: 1fr; } }
  `],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  summary: TaskSummary | null = null;
  selectedStatus: TaskStatus | 'all' = 'all';
  loading = false;
  message = '';

  constructor(private readonly taskApi: TaskApiService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  get filteredTasks(): Task[] {
    return this.selectedStatus === 'all'
      ? this.tasks
      : this.tasks.filter((task) => task.status === this.selectedStatus);
  }

  loadDashboard(): void {
    this.loading = true;
    this.taskApi.listTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.loading = false;
    });

    this.taskApi.getSummary().subscribe((summary) => {
      this.summary = summary;
    });
  }

  addTask(request: CreateTaskRequest): void {
    this.taskApi.createTask(request).subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.message = `${task.title} added`;
      this.loadDashboard();
    });
  }

  markDone(task: Task): void {
    this.taskApi.changeStatus(task.id, 'done').subscribe((updated) => {
      this.tasks = this.tasks.map((item) => (item.id === updated.id ? updated : item));
      this.message = `${updated.title} marked as done`;
    });
  }
}
