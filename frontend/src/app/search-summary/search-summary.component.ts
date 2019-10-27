import { Component, OnInit, Input } from '@angular/core';
import _ from 'underscore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'search-summary',
  templateUrl: './search-summary.component.html',
  styleUrls: ['./search-summary.component.css']
})
export class SearchSummaryComponent implements OnInit {
  @Input('origin') origin
  @Input('data') data: {
    ratings?: {},
    reviews?: {},
    types?: {},
    user_ratings?: {},
    total?: number
  }
  objectKeys = Object.keys
  showData = false

  showMapToolTip: string = 'Show Place in Google Maps'
  gmapLink: string = ''

  // types chart
  typeChartLabel = "Types"
  haveTypesChart = false
  typesChart = []
  typesChartLabels = []
  // ratings chart
  ratingChartLabel = "Ratings"
  haveRatingsChart = false
  ratingsChart = []
  // reviews chart
  reviewChartLabel = "Reviews"
  haveReviewsChart = false
  reviewsChart = []
  // Users Rating chart
  userRatingChartLabel = "Users Rating"
  haveUserRatingsChart = false
  userRatingsChart = []

  constructor() { }

  ngOnInit() {
    if (!_.isEmpty(this.origin)) {
      this.gmapLink = `${environment.gmapsPlaceRedirect}${this.origin.id}`
    }
    this.showData = !_.isEmpty(this.data)

    // Types
    if (!_.isEmpty(this.data.types)) {
      Object.keys(this.data.types).map(label => {
        this.typesChart.push(this.data.types[label])
        this.typesChartLabels.push(label)
        this.haveTypesChart = (!_.isEmpty(this.typesChart) && !_.isEmpty(this.typesChartLabels))
      })
    }
    // Ratings
    if (!_.isEmpty(this.data.ratings)) {
      this.ratingsChart = this.buildScatterChartData(this.data.ratings, 'haveRatingsChart')
    }
    // Reviews
    if (!_.isEmpty(this.data.reviews)) {
      this.reviewsChart = this.buildScatterChartData(this.data.reviews, 'haveReviewsChart')
    }
    // Total Rating Users
    if (!_.isEmpty(this.data.user_ratings)) {
      this.userRatingsChart = this.buildScatterChartData(this.data.user_ratings, 'haveUserRatingsChart')
    }
  }

  buildScatterChartData(data, haveChart) {
    const chartData = Object.keys(data).map(key => ({ x: key, y: data[key] }))
    this[haveChart] = !_.isEmpty(chartData)
    return chartData
  }
}
