import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('id')
      if (!_.isEmpty(this.collectionId)) {
        this.doc = this.afs.doc(`/places_collection/${this.collectionId}`)
        console.log('doc: ', this.doc)
      }
    })
    console.log('collectionId: ', this.collectionId)
  }

}
