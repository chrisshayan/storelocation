import { PlacesSearchService } from './../places-search.service';
import { PlaceAutocompleteService } from './../place-autocomplete.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import _ from 'underscore';
import { SearchStateService } from '../search-state.service';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input('searchType') searchType: string
  @Input('searchForm') searchForm: FormGroup

  minRadius: number = 5
  maxRadius: number = 500
  radiusToolTip: string = "Defines the distance (in meters) within which to return place results. \
    The maximum allowed radius is 500 meters."
  options = []
  predictions = []
  currentState = {}

  constructor(private placeAutocomplete: PlaceAutocompleteService,
    private placesSearch: PlacesSearchService, private searchState: SearchStateService) { }

  ngOnInit() {
    this.searchState.currentState.subscribe(state => this.currentState = state)
  }

  autocomplete($event) {
    const { query: input } = this.searchForm.value
    if ($event.keyCode !== 13 && input.length > 2) {
      this.placeAutocomplete.predict(input).subscribe(predict => {
        this.predictions = predict
        this.options = predict.map(p => p.name)
      })
    }
    return []
  }

  onSearch() {
    let { query, radius } = this.searchForm.value
    const place = this.predictions.filter(p => p.name === query)
    query = !_.isEmpty(place) ? place[0].id : query

    this.searchState.update(this.currentState, { [this.searchType]: { viewMode: 'searching' } })

    this.placesSearch.search(query, radius).subscribe(results => {
      const { summary, origin, arround } = results
      let newState = {}
      if (!_.isEmpty(origin) && (!_.isEmpty(summary) || !_.isEmpty(arround))) {
        newState = { [this.searchType]: { viewMode: 'summary', summary, origin, arround } }
      } else {
        newState = { [this.searchType]: { viewMode: 'noResult' } }
      }
      return this.searchState.update(this.currentState, newState)
    })
  }
}
