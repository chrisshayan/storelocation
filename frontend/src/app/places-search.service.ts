import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface Review {
  author: string
  rating: number
  relative_time: string
  text: string
  time: number
}

interface Place {
  id: string
  name: string
  coordinate: string
  phone: string
  address: string
  price_level: string
  rating: number
  user_ratings_total: number
  website: string
  types: string[]
  reviews: Review[]
}

export interface PlaceSummary {
  distribute?: any
  unique?: any
}

export interface SearchResult {
  arround?: Place[]
  origin?: Place
  summary?: PlaceSummary
  runtime?: number
}

@Injectable({
  providedIn: 'root'
})
export class PlacesSearchService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  }
  constructor(private http: HttpClient) { }

  search(query: string, radius: number, filters: { type: string, opennow: boolean }): Observable<SearchResult> {
    // console.log('filters: ', filters)
    const searchPlaceUrl = `${environment.apiUrl}/place/search`
    return this.http.post<SearchResult>(searchPlaceUrl, JSON.stringify({ query, radius, ...filters }), this.httpOptions)
  }
}
