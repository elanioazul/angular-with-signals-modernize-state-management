import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <h1>Angular signals</h1>
  <!-- {{item()}}
  {{item()?.toLocaleLowerCase()}} -->

  last: {{lastItem().name}}

  <button (click)="this.handleClick()">log items</button>

  <ul>
    @for(item of filteredItems(); track 'id') {
      <li>{{item.name}}</li>
    }

  </ul>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  item = signal<string | undefined>('hey');

  items = signal([
    {id: 1, name: 'Andy'},
    {id: 2, name: 'Hugo'},
    {id: 3, name: 'Willy'},

  ])

  lastItem = computed(() => this.items().slice(-1)[0]);

  nameFilter = signal('Willy')

  filteredItems = computed(() => {
    const nameFilter = this.nameFilter().toLocaleLowerCase();
    return this.items().filter((item) => {
      return item.name.toLocaleLowerCase().includes(nameFilter)
    })
  })

  handleClick(): void {
    console.log(this.items());
    
  }
}
