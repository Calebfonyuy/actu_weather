import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.css']
})
export class DetailedWeatherComponent implements OnInit {


  hourDisplay: boolean = true
  dayDisplay: boolean = false
  constructor() { }

  ngOnInit() {
  }

  public onHourDisplay(){
    this.dayDisplay = false;
    this.hourDisplay = true;
  }

  public onDayDisplay() {
    this.hourDisplay = false
    this.dayDisplay = true
  }
}
