import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit,OnChanges  {
   @Input() title:string ='sin titulo';
   @Input() data:any[]=[];
   @Input() ejey:string = "conductividad termica"
   @Input() ejex:string = '';
   @Input() pointColor:string;
   public scatterChartOptions: ChartOptions = {
    responsive: true,
   
  }
   

  public scatterChartData: ChartDataSets[] = [
    {
      data:this.data,
      label: 'titulo label',
      pointRadius: 3,
    },
  ];
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
  public scatterChartType: ChartType = 'scatter';

  constructor() { 
    
    
    
  }

  ngOnInit() {
  }
  ngOnChanges (){
    this.scatterChartData[0].data = this.data;
    this.scatterChartData[0].label = this.ejey;
    this.chartColors[0].pointBackgroundColor = this.pointColor;
    this.chartColors[0].backgroundColor = this.pointColor;
    this.chartColors[0].borderColor = this.pointColor;

  
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
