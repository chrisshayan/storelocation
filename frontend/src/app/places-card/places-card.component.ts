import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor(private fb: FormBuilder, private searchState: SearchStateService) {
  }

  ngOnInit() {
    // Search Form
    const searchCriteria = this.searchBox[this.searchType]
    this.searchForm = this.fb.group({
      query: [searchCriteria.query, Validators.required],
      radius: [searchCriteria.radius],
      typeFilter: [searchCriteria.typeFilter],
      opennowFilter: [searchCriteria.opennowFilter]
    })

    this.searchState.currentState.subscribe(state => {
      const { viewMode } = state[this.searchType]
      if (!_.isEmpty(viewMode)) { this.showSearchContent = true }
    })
  }
}
