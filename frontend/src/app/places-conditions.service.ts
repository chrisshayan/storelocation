import { environment } from './../environments/environment';
import { Condition } from './collect-places/collect-places.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface PlacesConditionsResponse {
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class PlacesConditionsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  }
  constructor(private http: HttpClient) { }

  create(conditions: Condition[], email: string) {
    const searchPlaceUrl = `${environment.apiUrl}/conditions/add`
    return this.http.post<PlacesConditionsResponse>(searchPlaceUrl, JSON.stringify({ conditions, email }), this.httpOptions)
  }
}
