import { CollectPlacesService } from './../collect-places.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collect-places',
  templateUrl: './collect-places.component.html',
  styleUrls: ['./collect-places.component.css']
})
export class CollectPlacesComponent implements OnInit {

  placesCollection

  constructor(private service: CollectPlacesService) { }

  ngOnInit() {
    this.service.getPlacesCollection('').subscribe(c => this.placesCollection = c)
  }


}
