import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  @Input('data') data: {}

  constructor() { }

  ngOnInit() {
  }

}
