import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import _ from 'underscore';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';

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

  showResults: boolean = false
  pageSize = 5
  pageLength = 0
  pageSizeOptions = [5, 10, 15]

  footerData: PlaceDetail
  data: PlaceDetail[] = []
  dataSource: MatTableDataSource<PlaceDetail>

  ratingOptions: number[] = []
  noOfRatingsOptions: number[] = []
  noOfReviewsOptions: number[] = []

  filterForm = this.fb.group({
    rating: [''],
    noOfRatings: [''],
    noOfReviews: ['']
  })

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // console.log('filterForm', this.filterForm)
    this.data = this.buildData(this.results)
    if (!_.isEmpty(this.data)) {
      this._buildFormFilterOptions(this.data)
    }
    // on change filters
    this.onFilters()

    // generate dataSource
    this.dataSource = new MatTableDataSource(this.data)
    this.pageLength = this.data.length
    this.showResults = true
    this.footerData = this.buildFooterData(this.origin)

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  onFilters() {
    Object.keys(this.filterForm.value).forEach(type => {
      this.filterForm.get(type).valueChanges.subscribe(value => {
        if (value) {
          this._filter(type, value)
        }
      })
    })
  }

  onClearFilters() {
    this.dataSource = new MatTableDataSource(this.data)
    this.pageLength = this.data.length
    this.dataSource.paginator = this.paginator
    this._buildFormFilterOptions(this.data)
    // Reset value of all filters
    Object.keys(this.filterForm.value).forEach(type => this.filterForm.get(type).setValue(null))
  }

  private _filter(type, value) {
    const filteredData = this.data.filter(d => {
      return d[type] == value
    })
    this.dataSource = new MatTableDataSource(filteredData)
    this.pageLength = filteredData.length
    this.dataSource.paginator = this.paginator

    // rebuild form filters options
    this._buildFormFilterOptions(filteredData)
  }

  private _buildFormFilterOptions(data) {
    this.ratingOptions = this.buildFilterAutoOptions(data, 'rating')
    this.noOfRatingsOptions = this.buildFilterAutoOptions(data, 'noOfRatings')
    this.noOfReviewsOptions = this.buildFilterAutoOptions(data, 'noOfReviews')
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
        rating, noOfRatings, noOfReviews,
        gmapLink: `${environment.gmapsPlaceRedirect}${id}`
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
      rating, noOfRatings, noOfReviews,
      gmapLink: `${environment.gmapsPlaceRedirect}${id}`
    }
  }

  buildFilterAutoOptions(options, field) {
    return _.sortBy(_.uniq(options.map(d => d[field])), op => op)
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
  gmapLink: string
}