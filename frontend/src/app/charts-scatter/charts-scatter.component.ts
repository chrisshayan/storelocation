import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import _ from 'underscore';
// import { Label } from 'ng2-charts';

export interface ChartScatterData {
  x: string
  y: string
}

@Component({
  selector: 'charts-scatter',
  templateUrl: './charts-scatter.component.html',
  styleUrls: ['./charts-scatter.component.css']
})
export class ChartsScatterComponent implements OnInit {
  @Input() data: ChartScatterData[]
  @Input() label: string
  @Input() pointRadius: number = 10
  @Input() xAxisLabel: string = ''
  @Input() yAxisLabel: string = ''
  // scatter
  public scatterChartOptions: ChartOptions = {
    responsive: true,
  };

  public scatterChartData: ChartDataSets[] = [
    {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
        { x: 5, y: -3, r: 20 },
      ],
      label: 'Series A',
      pointRadius: 10,
    },
  ];
  public scatterChartType: ChartType = 'scatter';
  constructor() { }

  ngOnInit() {
    this.scatterChartData = [
      { data: this.data, label: this.label, pointRadius: this.pointRadius }
    ]
    if (!_.isEmpty(this.xAxisLabel)) {
      this.scatterChartOptions.scales = {
        ...this.scatterChartOptions.scales,
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.xAxisLabel
          }
        }]
      }
    }
    if (!_.isEmpty(this.yAxisLabel)) {
      this.scatterChartOptions.scales = {
        ...this.scatterChartOptions.scales,
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.yAxisLabel
          }
        }]
      }
    }
  }

}
