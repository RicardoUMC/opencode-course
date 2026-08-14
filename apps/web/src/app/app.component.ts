import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">Team Tasks</p>
        <h1>Task board</h1>
        <p>Track ownership, status, and due dates for a small delivery team.</p>
      </section>

      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .shell {
      width: min(1120px, calc(100% - 32px));
      margin: 0 auto;
      padding: 40px 0 56px;
    }

    .hero {
      position: relative;
      overflow: hidden;
      margin-bottom: 24px;
      padding: 32px;
      border: 1px solid rgba(148, 163, 184, 0.24);
      border-radius: 28px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(239, 246, 255, 0.88));
      box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
    }

    .hero::after {
      content: '';
      position: absolute;
      right: -64px;
      top: -80px;
      width: 220px;
      height: 220px;
      border-radius: 999px;
      background: rgba(37, 99, 235, 0.12);
    }

    .hero h1 {
      position: relative;
      margin: 0;
      color: #0f172a;
      font-size: clamp(2.25rem, 7vw, 4.75rem);
      line-height: 0.95;
      letter-spacing: -0.07em;
    }

    .hero p:last-child {
      position: relative;
      max-width: 620px;
      margin: 18px 0 0;
      color: #475569;
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .eyebrow {
      position: relative;
      display: inline-flex;
      margin: 0 0 14px;
      padding: 7px 12px;
      border: 1px solid rgba(37, 99, 235, 0.18);
      border-radius: 999px;
      background: rgba(37, 99, 235, 0.08);
      color: #1d4ed8;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    @media (max-width: 640px) {
      .shell { width: min(100% - 20px, 1120px); padding-top: 20px; }
      .hero { padding: 24px; border-radius: 22px; }
    }
  `],
})
export class AppComponent {}
