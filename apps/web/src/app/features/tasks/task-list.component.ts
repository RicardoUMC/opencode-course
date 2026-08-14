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
      <div>
        <p>Board view</p>
        <label for="statusFilter">Filter by status</label>
      </div>
      <div class="select-wrap">
        <select id="statusFilter" [(ngModel)]="selectedStatus">
          <option value="all">All</option>
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </section>

    <p class="message" *ngIf="message">{{ message }}</p>
    <p class="state" *ngIf="loading">Loading tasks...</p>

    <section class="task-list" *ngIf="!loading">
      <p class="state" *ngIf="filteredTasks.length === 0">No tasks match this filter yet.</p>
      <article class="task-card" *ngFor="let task of filteredTasks">
        <div class="task-main">
          <h2>{{ task.title }}</h2>
          <p>{{ task.description }}</p>
        </div>
        <dl class="task-meta">
          <div><dt>Assignee</dt><dd>{{ task.assignee }}</dd></div>
          <div><dt>Status</dt><dd><span class="status-pill" [ngClass]="task.status">{{ task.status }}</span></dd></div>
          <div><dt>Due date</dt><dd>{{ task.dueDate }}</dd></div>
        </dl>
        <button type="button" (click)="markDone(task)">Mark done</button>
      </article>
    </section>
  `,
  styles: [`
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 16px;
      padding: 16px 18px;
      border: 1px solid rgba(148, 163, 184, 0.24);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.72);
      box-shadow: 0 12px 34px rgba(15, 23, 42, 0.06);
    }

    .toolbar p {
      margin: 0 0 4px;
      color: #0f172a;
      font-size: 1rem;
      font-weight: 800;
    }

    .toolbar label {
      color: #64748b;
      font-size: 0.86rem;
      font-weight: 700;
    }

    .select-wrap { position: relative; min-width: 190px; }
    .select-wrap::after { content: '▾'; position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #64748b; pointer-events: none; }

    select {
      width: 100%;
      appearance: none;
      padding: 11px 40px 11px 13px;
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      outline: none;
      background: #ffffff;
      color: #0f172a;
      font-weight: 700;
      cursor: pointer;
    }

    select:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12); }

    .message, .state {
      margin: 0 0 16px;
      padding: 14px 16px;
      border-radius: 16px;
      background: rgba(236, 253, 245, 0.92);
      color: #047857;
      font-weight: 800;
    }

    .state { background: rgba(241, 245, 249, 0.92); color: #475569; }

    .task-list { display: grid; gap: 16px; }

    .task-card {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(260px, auto) auto;
      gap: 22px;
      align-items: center;
      padding: 20px;
      border: 1px solid rgba(148, 163, 184, 0.28);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 18px 48px rgba(15, 23, 42, 0.09);
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
    }

    .task-card:hover {
      transform: translateY(-2px);
      border-color: rgba(37, 99, 235, 0.22);
      box-shadow: 0 24px 58px rgba(15, 23, 42, 0.12);
    }

    .task-card h2 { margin: 0 0 8px; color: #0f172a; font-size: 1.18rem; letter-spacing: -0.02em; }
    .task-card p, .task-card dl, .task-card dd { margin: 0; }
    .task-main p { color: #64748b; line-height: 1.6; }

    .task-meta {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, auto));
      gap: 12px;
    }

    .task-meta div { min-width: 0; }
    .task-meta dt { margin-bottom: 4px; color: #94a3b8; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
    .task-meta dd { color: #1e293b; font-weight: 700; }

    .status-pill {
      display: inline-flex;
      align-items: center;
      padding: 5px 9px;
      border-radius: 999px;
      background: #eff6ff;
      color: #1d4ed8;
      font-size: 0.78rem;
      font-weight: 900;
    }

    .status-pill.todo { background: #fffbeb; color: #b45309; }
    .status-pill.in_progress { background: #eff6ff; color: #1d4ed8; }
    .status-pill.done { background: #ecfdf5; color: #047857; }

    .task-card button {
      border: 0;
      border-radius: 999px;
      padding: 11px 16px;
      background: #0f172a;
      color: #fff;
      font-weight: 800;
      cursor: pointer;
      transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
    }

    .task-card button:hover { transform: translateY(-1px); background: #2563eb; box-shadow: 0 12px 24px rgba(37, 99, 235, 0.24); }
    .task-card button:focus-visible { outline: 4px solid rgba(37, 99, 235, 0.2); outline-offset: 3px; }

    @media (max-width: 900px) {
      .task-card { grid-template-columns: 1fr; align-items: stretch; }
      .task-meta { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .task-card button { justify-self: start; }
    }

    @media (max-width: 560px) {
      .toolbar { align-items: stretch; flex-direction: column; }
      .select-wrap { min-width: 0; }
      .task-meta { grid-template-columns: 1fr; }
      .task-card button { width: 100%; }
    }
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
