import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import _ from 'underscore';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  @Input('results') results = []
  @Input('origin') origin = {}

  MAX_DATA_SHOW = 3
  displayedColumns = ['name', 'types', 'rating', 'noOfRatings', 'noOfReviews']

  showResults: boolean = false
  pageSize = 5
  pageLength = 0
  data: PlaceDetail[] = []
  footerData: PlaceDetail
  dataSource: MatTableDataSource<PlaceDetail>

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  ngOnInit() {
    this.data = this.buildData(this.results)
    this.dataSource = new MatTableDataSource(this.data)
    this.pageLength = this.data.length
    this.showResults = true
    this.footerData = this.buildFooterData(this.origin)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  buildData(places): PlaceDetail[] {
    return places.map((place, position) => {
      const {
        id, name, coordinate, types, rating,
        reviews, user_ratings_total: noOfRatings
      } = place
      const noOfReviews = (!_.isEmpty(reviews)) ? reviews.length : 0

      return {
        position, id, name, coordinate, types: this.getTypesText(types),
        rating, noOfRatings, noOfReviews
      }
    })
  }

  buildFooterData(place): PlaceDetail {
    const {
      id, name, coordinate, types, rating,
      reviews, user_ratings_total: noOfRatings
    } = place
    const noOfReviews = (!_.isEmpty(reviews)) ? reviews.length : 0
    return {
      id, name, coordinate, types: this.getTypesText(types),
      rating, noOfRatings, noOfReviews
    }
  }

  getTypesText(types) {
    let text = ''
    if (!_.isEmpty(types)) {
      text = types.map((ty, i) => {
        if (i < this.MAX_DATA_SHOW) return ty
      }).join(',')
      if (types.length > this.MAX_DATA_SHOW) {
        text = text + '...'
      }
    }
    return text
  }
}

export interface PlaceDetail {
  position?: number
  id: string
  name: string
  coordinate: string
  types: string
  rating: number
  noOfRatings: number
  noOfReviews: number
  // priceLevel: string
}