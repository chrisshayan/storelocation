import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'charts-line',
  templateUrl: './charts-line.component.html',
  styleUrls: ['./charts-line.component.css']
})
export class ChartsLineComponent implements OnInit {
  @Input('label') label: string
  @Input('data') data: []
  @Input('chartLabels') chartLabels: []
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    this.lineChartLabels = this.chartLabels
    this.lineChartData = [{ data: this.data, label: this.label }]
  }

}
