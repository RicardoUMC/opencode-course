import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TaskSummary } from './task.model';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="summary" *ngIf="summary">
      <article class="todo"><span>To do</span><strong>{{ summary.todo }}</strong></article>
      <article class="progress"><span>In progress</span><strong>{{ summary.inProgress }}</strong></article>
      <article class="done"><span>Done</span><strong>{{ summary.done }}</strong></article>
    </section>
  `,
  styles: [`
    .summary {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-bottom: 18px;
    }

    article {
      position: relative;
      overflow: hidden;
      padding: 20px;
      border: 1px solid rgba(148, 163, 184, 0.24);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 16px 42px rgba(15, 23, 42, 0.08);
    }

    article::before {
      content: '';
      position: absolute;
      inset: 0 auto 0 0;
      width: 5px;
      background: #2563eb;
    }

    .todo::before { background: #f59e0b; }
    .progress::before { background: #2563eb; }
    .done::before { background: #059669; }

    span {
      display: block;
      color: #64748b;
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    strong {
      display: block;
      margin-top: 8px;
      color: #0f172a;
      font-size: clamp(2rem, 5vw, 3rem);
      line-height: 1;
    }

    @media (max-width: 700px) { .summary { grid-template-columns: 1fr; } }
  `],
})
export class TaskSummaryComponent {
  @Input() summary: TaskSummary | null = null;
}
