import { CommonModule } from '@angular/common';
import { Component, computed, signal, Signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './items.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <h1>Angular signals</h1>

  last: {{lastItem()?.name}}
  <br>

  <button (click)="this.handleClick()">log items</button>
  <button (click)="this.itemsService.clearItems()">clear items</button>
  <br>
  Añade items:
  <input type="text" [value]="newItem()" (input)="updateNewItemName($event)">
  <button (click)="this.itemsService.append(newItem())">append new</button>
  <br>
  Fitra items:
  <input type="text" [value]="nameFilter()" (input)="updateNameFilter($event)">
  <ul>
    @for(item of visibleItems(); track 'id') {
      <li>{{item.name}}</li>
    }

  </ul>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  itemsService = inject(ItemsService);
  item = signal<string | undefined>('hey');

  newItem = signal('');
  updateNewItemName(event: Event) {
    this.newItem.set((event.target as HTMLInputElement)['value'])
  }

  lastItem = computed(() => this.itemsService.items().slice(-1)[0]);

  nameFilter = signal('');

  updateNameFilter(event: Event) {
    this.nameFilter.set((event.target as HTMLInputElement)['value'])
  }

  filteredItems = computed(() => {
    const nameFilter = this.nameFilter().toLocaleLowerCase();
    return this.itemsService.items().filter((item: any) => {
      return item.name.toLocaleLowerCase().includes(nameFilter)
    })
  })

  ascOrder = signal(false);

  visibleItems = computed(() => {
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredItems().sort((a: any, b: any) => {
      return a.name.localeCompare(b.name) * order
    })
  })

  handleClick(): void {
    console.log(this.itemsService.items());
  }


}
