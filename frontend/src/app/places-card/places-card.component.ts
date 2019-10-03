import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'places-card',
  templateUrl: './places-card.component.html',
  styleUrls: ['./places-card.component.css']
})
export class PlacesCardComponent implements OnInit {
  @Input('searchType') searchType: string
  @Input('searchBox') searchBox

  searchForm: FormGroup

  showContent: boolean = false
  constructor() { }

  ngOnInit() {
    // Search Form
    this.searchForm = new FormGroup({
      query: new FormControl(this.searchBox[this.searchType].query),
      radius: new FormControl(this.searchBox[this.searchType].radius)
    })
  }
}
