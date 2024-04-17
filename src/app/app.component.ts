import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <h1>Angular signals</h1>
  {{item}}
  @if (item) {
    {{item.toLocaleLowerCase}}
  }
  <ul>
    @for (item of items(); track 'id') {
      <li>{{item.name}}</li>
    }

  </ul>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #item = signal<string | undefined>('hey');
  get item() {
    return this.#item();
  }
  items = signal([
    {id: 1, name: 'Andy'},
    {id: 2, name: 'Hugo'},
    {id: 3, name: 'Willy'},

  ])
}
