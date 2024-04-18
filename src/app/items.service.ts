import { Injectable, effect, signal, untracked } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  #items = signal([
    {id: 1, name: 'Andy'},
    {id: 2, name: 'Hugo'},
    {id: 3, name: 'Willy'},

  ])

  items = this.#items.asReadonly();

  clearItems() {
    this.#items.set([])
  }
  
  append(val: string) {
    this.#items.update(prev => [...prev, {id: prev.length + 1, name: val}])
  }

  example = signal(123)

  constructor() {}
}
