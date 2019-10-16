import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Prediction {
  id: string
  name: string
  types: string[]
}

@Injectable({
  providedIn: 'root'
})
export class PlaceAutocompleteService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  }

  constructor(private http: HttpClient) { }

  predict(input: string): Observable<Prediction[]> {
    const autocompletePlaceUrl = `${environment.apiUrl}/autocomplete`
    return this.http.post<Prediction[]>(autocompletePlaceUrl, JSON.stringify({ input }), this.httpOptions)
  }
}
