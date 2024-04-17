import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <h1>Angular signals</h1>
  
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  item = signal<string | undefined>(undefined)
}
