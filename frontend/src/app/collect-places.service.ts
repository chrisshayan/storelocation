import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectPlacesService {

  constructor(private http: HttpClient) { }


  getPlacesCollection(collectionId: string) {
    return this.http.get(collectionId)
  }
}
