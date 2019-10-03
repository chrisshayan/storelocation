import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import _ from 'underscore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  @Input('results') results = []
  @Input('origin') origin: {
    id?: string
  } = {}

  MAX_DATA_SHOW = 3
  displayedColumns = ['name', 'types', 'rating', 'noOfRatings', 'noOfReviews']

  showMapToolTip: string = 'Show Place in Google Maps'
  gmapLink: string = ''

  showResults: boolean = false
  pageSize = 5
  pageLength = 0
  pageSizeOptions = [5, 10, 15]

  footerData: PlaceDetail
  data: PlaceDetail[] = []
  dataSource: MatTableDataSource<PlaceDetail>

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  ngOnInit() {
    this.data = this.buildData(this.results)
    this.dataSource = new MatTableDataSource(this.data)
    this.pageLength = this.data.length
    this.showResults = true
    this.footerData = this.buildFooterData(this.origin)

    if (!_.isEmpty(this.origin)) {
      this.gmapLink = `${environment.gmapsPlaceRedirect}${this.origin.id}`
    }
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