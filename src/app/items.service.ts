import { Injectable, effect, signal, untracked } from '@angular/core';

type Item = {
  id: number,
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  // #items = signal([
  //   {id: 1, name: 'Andy'},
  //   {id: 2, name: 'Hugo'},
  //   {id: 3, name: 'Willy'},

  // ])
  #items = signal(JSON.parse(localStorage.getItem('items')!))

  items = this.#items.asReadonly();

  syncronyzeItemsAtStorage = effect(() => {
    localStorage.setItem('items', JSON.stringify(this.#items()))
  })

  clearItems() {
    this.#items.set([])
  }
  
  append(val: string) {
    this.#items.update(prev => [...prev, {id: prev.length + 1, name: val}])
  }

  example = signal(123)

  constructor() {}
}
