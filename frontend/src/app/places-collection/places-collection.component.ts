import { PlacesCollectionService } from './../places-collection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'underscore'

@Component({
  selector: 'app-places-collection',
  templateUrl: './places-collection.component.html',
  styleUrls: ['./places-collection.component.css']
})
export class PlacesCollectionComponent implements OnInit {
  collectionId: string
  doc
  // private collectionDoc: AngularFirestoreDocument
  // collection: Observable<>

  constructor(private route: ActivatedRoute, private placesCollectionService: PlacesCollectionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('id')
      if (!_.isEmpty(this.collectionId)) {
        this.placesCollectionService.get(this.collectionId).subscribe(doc => this.doc = doc.data())
      }
    })
    console.log('collectionId: ', this.collectionId)
  }

}
