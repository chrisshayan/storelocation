import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlacesCollectionService {

  collections: AngularFirestoreCollection<any>
  // private collection: AngularFirestoreDocument<any>

  constructor(private firestore: AngularFirestore) {
    this.collections = this.firestore.collection<any>('places_collection')
  }

  get(id: string) {
    return this.collections.doc(id).get()
  }
}
