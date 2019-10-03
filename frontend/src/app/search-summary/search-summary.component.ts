import { Component, OnInit, Input } from '@angular/core';
import _ from 'underscore';

@Component({
  selector: 'search-summary',
  templateUrl: './search-summary.component.html',
  styleUrls: ['./search-summary.component.css']
})
export class SearchSummaryComponent implements OnInit {
  @Input('origin') origin: {}
  @Input('data') data: {
    ratings?: {},
    reviews?: {},
    types?: {},
    user_ratings?: {}
  }
  objectKeys = Object.keys
  showData = false

  // types chart
  typeChartLabel = "Types"
  haveTypesChart = false
  typesChart = []
  typesChartLabels = []
  // ratings chart
  ratingChartLabel = "Ratings"
  haveRatingChart = false
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
    this.showData = !_.isEmpty(this.data)

    // Types
    if (!_.isEmpty(this.data.types)) {
      Object.keys(this.data.types).map(label => {
        console.log('buil label', label)
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

    // console.log('data', JSON.stringify(this.data))
  }

  buildScatterChartData(data, haveChart) {
    const chartData = Object.keys(data).map(key => ({ x: key, y: data[key] }))
    this[haveChart] = !_.isEmpty(chartData)
    return chartData
  }
}
