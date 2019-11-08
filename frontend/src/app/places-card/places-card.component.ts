import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchStateService } from '../search-state.service';
import _ from 'underscore';

@Component({
  selector: 'places-card',
  templateUrl: './places-card.component.html',
  styleUrls: ['./places-card.component.css']
})
export class PlacesCardComponent implements OnInit {
  @Input('searchType') searchType: string
  @Input('searchBox') searchBox

  searchForm: FormGroup
  showSearchContent: boolean = false

  showContent: boolean = false
  constructor(fb: FormBuilder, private searchState: SearchStateService) {
    // Search Form
    const searchCriteria = this.searchBox[this.searchType]
    this.searchForm = fb.group({
      query: [searchCriteria.query],
      radius: [searchCriteria.radius],
      typeFilter: [searchCriteria.typeFilter],
      opennowFilter: [searchCriteria.opennowFilter]
    })
  }

  ngOnInit() {
    this.searchState.currentState.subscribe(state => {
      const { viewMode } = state[this.searchType]
      if (!_.isEmpty(viewMode)) { this.showSearchContent = true }
    })
  }
}
