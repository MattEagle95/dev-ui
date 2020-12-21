import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-chart',
  templateUrl: './number-chart.component.html',
  styleUrls: ['./number-chart.component.css']
})
export class NumberChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  view: any[] = [600, 400];
  results: any[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "USA 2",
      "value": 50000000
    }
  ]

}
