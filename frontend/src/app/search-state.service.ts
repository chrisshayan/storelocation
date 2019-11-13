import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SearchState {
  viewMode: string  // searching | summary | results | results-json | detail | noResult | ''
  summary: any
  origin: any
  arround: any
}

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private stateSource = new BehaviorSubject(this.initiate())
  currentState = this.stateSource.asObservable()

  constructor() { }

  update(currentState, newState) {
    this.stateSource.next({ ...currentState, ...newState })
  }

  initiate() {
    return {
      columns: 1,
      base: { viewMode: '', summary: {}, origin: {}, arround: [] },
      compare: { viewMode: '', summary: {}, origin: {}, arround: [] }
    }
  }
}
