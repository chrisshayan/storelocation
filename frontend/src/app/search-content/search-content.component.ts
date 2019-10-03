import { SearchStateService } from './../search-state.service';
import { Component, OnInit, Input } from '@angular/core';
import _ from 'underscore';

@Component({
  selector: 'search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.css']
})
export class SearchContentComponent implements OnInit {
  @Input('searchType') searchType: string
  // ratingChartScatterLabel = "Ratings"
  viewMode = '' // searching | summary | results | detail | noResult | ''
  summary = {}
  origin = {}
  arround = []
  actions = ['compare', 'view summary', 'view results', 'no compare']

  currentState = {}

  constructor(private searchState: SearchStateService) { }

  ngOnInit() {
    // console.log('searchType', this.searchType)
    this.searchState.currentState.subscribe(state => {
      this.currentState = state
      // console.log('state', state)
      const { viewMode, summary, origin, arround } = state[this.searchType]
      this.viewMode = viewMode
      this.summary = summary
      this.origin = origin
      this.arround = arround

      // console.log('summary', JSON.stringify(summary))
      // console.log('origin', JSON.stringify(origin))
      // console.log('arround', JSON.stringify(arround))
    })
  }

  onClickAction(action) {
    // console.log('action', action)
    // console.log('searchType', this.searchType)
    switch (action) {
      case 'compare': {
        return this.searchState.update(this.currentState, { columns: 2 })
      }
      case 'no compare': {
        return this.searchState.update(this.currentState, { columns: 1 })
      }
      case 'view results': {
        return this.searchState.update(this.currentState,
          { [this.searchType]: { ...this.currentState[this.searchType], viewMode: 'results' } })
      }
      case 'view summary': {
        return this.searchState.update(this.currentState,
          { [this.searchType]: { ...this.currentState[this.searchType], viewMode: 'summary', } })
      }
    }
  }
}
