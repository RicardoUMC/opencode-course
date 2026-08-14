import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTaskRequest } from './task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="task-form" (ngSubmit)="submit()">
      <input class="wide" name="title" placeholder="Title" [(ngModel)]="draft.title" required>
      <input name="assignee" placeholder="Assignee" [(ngModel)]="draft.assignee" required>
      <input name="dueDate" type="date" [(ngModel)]="draft.dueDate" required>
      <input class="wide" name="description" placeholder="Description" [(ngModel)]="draft.description">
      <button type="submit">Add task</button>
    </form>
  `,
  styles: [`
    .task-form {
      display: grid;
      grid-template-columns: 1.3fr 1fr 0.9fr 1.4fr auto;
      gap: 12px;
      margin-bottom: 18px;
      padding: 16px;
      border: 1px solid rgba(148, 163, 184, 0.24);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.82);
      box-shadow: 0 16px 42px rgba(15, 23, 42, 0.08);
    }

    input {
      min-width: 0;
      width: 100%;
      padding: 12px 13px;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      outline: none;
      background: #ffffff;
      color: #0f172a;
      transition: border-color 0.18s ease, box-shadow 0.18s ease;
    }

    input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
    }

    button {
      border: 0;
      border-radius: 999px;
      padding: 12px 18px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #fff;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 12px 24px rgba(37, 99, 235, 0.24);
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    button:hover { transform: translateY(-1px); box-shadow: 0 16px 30px rgba(37, 99, 235, 0.28); }
    button:focus-visible { outline: 4px solid rgba(37, 99, 235, 0.2); outline-offset: 3px; }

    @media (max-width: 920px) {
      .task-form { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .wide { grid-column: span 2; }
      button { grid-column: span 2; }
    }

    @media (max-width: 560px) {
      .task-form { grid-template-columns: 1fr; padding: 14px; }
      .wide, button { grid-column: auto; }
    }
  `],
})
export class TaskFormComponent {
  @Output() createTask = new EventEmitter<CreateTaskRequest>();

  draft: CreateTaskRequest = { title: '', description: '', assignee: '', dueDate: '' };

  submit(): void {
    this.createTask.emit(this.draft);
    this.draft = { title: '', description: '', assignee: '', dueDate: '' };
  }
}
