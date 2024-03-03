import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-template',
  standalone: true,
  imports: [],
  templateUrl: './weather-template.component.html',
  styleUrl: './weather-template.component.css'
})
export class WeatherTemplateComponent implements OnInit, OnChanges{
  WeatherData:any;
  @Input() lati: number | null = null;
  @Input() long: number | null = null;
  @Input() day: number | number = 0;

  latitude: number| null = null;
  longitude: number| null = null;
  dayNumber: number| number = 0;

  constructor() {}

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    this.parseData();
    console.log(this.WeatherData);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['firstChange']) return;
    this.parseData();
    this.getWeatherData();
  }

  parseData(){
    this.latitude = this.lati;
    this.longitude = this.long;
    this.dayNumber = this.day;
  }

  getWeatherData(){
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.lati}&lon=${this.long}&exclude=hourly,minutely&appid=b59bdb0f1f92558d4d4e9d9d0989e7cd`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.daily[this.dayNumber].sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.daily[this.dayNumber].temp.day - 273.15).toFixed(0);
    this.WeatherData.status = (this.WeatherData.daily[this.dayNumber].summary);
    this.WeatherData.temp_feels_like = (this.WeatherData.daily[this.dayNumber].feels_like.day - 273.15).toFixed(0);
    this.WeatherData.name = (this.WeatherData.timezone);
    this.WeatherData.humidity =(this.WeatherData.daily[this.dayNumber].humidity);
  }
}
