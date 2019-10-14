import { Observable } from 'rxjs';
import { PlacesSearchService } from './../places-search.service';
import { PlaceAutocompleteService } from './../place-autocomplete.service';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import _ from 'underscore';
import { SearchStateService } from '../search-state.service';
import { startWith, map } from 'rxjs/operators';

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
  filterTypeToolTip: string = "Restricts the results to places matching the specified type. \
    Only one type may be specified (if more than one type is provided, all types following the first entry are ignored)."
  autoTypeFilter: string[] = ['accounting', 'airport', 'amusement_park', 'aquarium', 'art_gallery', 'atm', 'bakery', 'bank', 'bar',
    'beauty_salon', 'bicycle_store', 'book_store', 'bowling_alley', 'bus_station', 'cafe', 'campground', 'car_dealer',
    'car_rental', 'car_repair', 'car_wash', 'casino', 'cemetery', 'church', 'city_hall', 'clothing_store', 'convenience_store',
    'courthouse', 'dentist', 'department_store', 'doctor', 'drugstore', 'electrician', 'electronics_store', 'embassy',
    'fire_station', 'florist', 'funeral_home', 'furniture_store', 'gas_station', 'grocery_or_supermarket', 'gym', 'hair_care',
    'hardware_store', 'hindu_temple', 'home_goods_store', 'hospital', 'insurance_agency', 'jewelry_store', 'laundry', 'lawyer',
    'library', 'light_rail_station', 'liquor_store', 'local_government_office', 'locksmith', 'lodging', 'meal_delivery',
    'meal_takeaway', 'mosque', 'movie_rental', 'movie_theater', 'moving_company', 'museum', 'night_club', 'painter', 'park',
    'parking', 'pet_store', 'pharmacy', 'physiotherapist', 'plumber', 'police', 'post_office', 'primary_school',
    'real_estate_agency', 'restaurant', 'roofing_contractor', 'rv_park', 'school', 'secondary_school', 'shoe_store',
    'shopping_mall', 'spa', 'stadium', 'storage', 'store', 'subway_station', 'supermarket', 'synagogue', 'taxi_stand',
    'tourist_attraction', 'train_station', 'transit_station', 'travel_agency', 'university', 'veterinary_care', 'zoo']
  autoTypeFilterOptions: Observable<string[]>

  predictions = []
  currentState = {}

  constructor(private placeAutocomplete: PlaceAutocompleteService,
    private placesSearch: PlacesSearchService, private searchState: SearchStateService) { }

  ngOnInit() {
    this.searchState.currentState.subscribe(state => this.currentState = state)
    this.autoTypeFilterOptions = this.searchForm.controls.typeFilter.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterType(value))
      )
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
    let { query, radius, typeFilter, opennowFilter } = this.searchForm.value
    const place = this.predictions.filter(p => p.name === query)
    query = !_.isEmpty(place) ? place[0].id : query
    // console.log('search values: ', this.searchForm.value)

    this.searchState.update(this.currentState, { [this.searchType]: { viewMode: 'searching' } })

    this.placesSearch.search(query, radius, { type: typeFilter, opennow: opennowFilter }).subscribe(results => {
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

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.autoTypeFilter.filter(option => option.toLowerCase().includes(filterValue))
  }
}
