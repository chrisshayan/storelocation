import { Component, OnInit } from '@angular/core';
import { SearchStateService } from '../search-state.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  cols: number = 1

  constructor(private searchState: SearchStateService) { }

  ngOnInit() {
    this.searchState.currentState.subscribe(state => this.cols = state.columns)
  }

}
