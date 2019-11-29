import { map } from 'rxjs/operators';
import { PlacesCollectionService } from './../places-collection.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'underscore'

@Component({
  selector: 'places-collection',
  templateUrl: './places-collection.component.html',
  styleUrls: ['./places-collection.component.css']
})
export class PlacesCollectionComponent implements OnInit {
  collectionId: string
  doc
  placesTypes = []
  // private collectionDoc: AngularFirestoreDocument
  // collection: Observable<>

  constructor(private route: ActivatedRoute, private placesCollectionService: PlacesCollectionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('id')
      if (!_.isEmpty(this.collectionId)) {
        this.placesCollectionService.get(this.collectionId).subscribe(doc => {
          this.doc = doc.data()
          if (!_.isEmpty(this.doc)) {
            if (!_.isEmpty(this.doc.places)) {
              this.placesTypes = this.transformPlaces(this.doc.places)
              console.log('placesTypes: ', JSON.stringify(this.placesTypes))
            }
          }
        })
      }
    })
    console.log('collectionId: ', this.collectionId)
  }

  transformPlaces(places) {
    return places.map(p => {
      const id = !_.isEmpty(p.origin.id) ? p.origin.id : p.origin.coordinate
      const name = p.origin.name || ''
      const types = p.summary.types || {}

      return { id, name, types }
    })
  }

}
