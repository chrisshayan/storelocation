import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-results-json',
  templateUrl: './search-results-json.component.html',
  styleUrls: ['./search-results-json.component.css']
})
export class SearchResultsJsonComponent {

  @Input('jsonContent') jsonContent = {}

}