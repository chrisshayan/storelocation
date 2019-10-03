import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input('data') data: []

  constructor() { }

  ngOnInit() {
  }

}
