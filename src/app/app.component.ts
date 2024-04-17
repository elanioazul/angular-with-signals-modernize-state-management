import { CommonModule } from '@angular/common';
import { Component, computed, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <h1>Angular signals</h1>
  <!-- {{item()}}
  {{item()?.toLocaleLowerCase()}} -->

  last: {{lastItem()?.name}}

  <button (click)="this.handleClick()">log items</button>
  <button (click)="clearItems()">clear items</button>
  <input type="text" [value]="newItem()" (input)="updateNewItemName($event)">
  <input type="text" [value]="nameFilter()" (input)="updateNameFilter($event)">
  <button (click)="append(newItem())">append new</button>

  <ul>
    @for(item of visibleItems(); track 'id') {
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

  clearItems() {
    this.items.set([])
  }

  newItem = signal('');
  updateNewItemName(event: Event) {
    this.newItem.set((event.target as HTMLInputElement)['value'])
  }

  append(val: string) {
    this.items.update(prev => [...prev, {id: prev.length + 1, name: val}])
  }

  lastItem = computed(() => this.items().slice(-1)[0]);

  nameFilter = signal('');

  updateNameFilter(event: Event) {
    this.nameFilter.set((event.target as HTMLInputElement)['value'])
  }

  filteredItems = computed(() => {
    const nameFilter = this.nameFilter().toLocaleLowerCase();
    return this.items().filter((item) => {
      return item.name.toLocaleLowerCase().includes(nameFilter)
    })
  })

  ascOrder = signal(false);

  visibleItems = computed(() => {
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredItems().sort((a, b) => {
      return a.name.localeCompare(b.name) * order
    })
  })

  handleClick(): void {
    console.log(this.items());
    
  }


}
