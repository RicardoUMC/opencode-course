import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskSummary } from './task.model';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="summary" *ngIf="summary">
      <article><strong>{{ summary.todo }}</strong><span>To do</span></article>
      <article><strong>{{ summary.inProgress }}</strong><span>In progress</span></article>
      <article><strong>{{ summary.done }}</strong><span>Done</span></article>
    </section>
  `,
  styles: [`
    .summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-bottom: 20px; }
    article { padding: 16px; border: 1px solid #d9dee8; border-radius: 12px; background: #fff; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08); }
    strong { display: block; font-size: 2rem; }
    @media (max-width: 700px) { .summary { grid-template-columns: 1fr; } }
  `],
})
export class TaskSummaryComponent {
  @Input() summary: TaskSummary | null = null;
}
