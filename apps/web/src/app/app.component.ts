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
    .shell { max-width: 960px; margin: 0 auto; padding: 32px 20px; }
    .hero { margin-bottom: 24px; }
    .eyebrow { color: #2563eb; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  `],
})
export class AppComponent {}
