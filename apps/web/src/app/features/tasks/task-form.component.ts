import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTaskRequest } from './task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="task-form" (ngSubmit)="submit()">
      <input name="title" placeholder="Title" [(ngModel)]="draft.title" required>
      <input name="assignee" placeholder="Assignee" [(ngModel)]="draft.assignee" required>
      <input name="dueDate" type="date" [(ngModel)]="draft.dueDate" required>
      <input name="description" placeholder="Description" [(ngModel)]="draft.description">
      <button type="submit">Add task</button>
    </form>
  `,
  styles: [`
    .task-form { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 18px; }
    input { min-width: 0; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
    button { border: 0; border-radius: 999px; padding: 10px 14px; background: #2563eb; color: #fff; cursor: pointer; }
    @media (max-width: 800px) { .task-form { grid-template-columns: 1fr; } }
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
