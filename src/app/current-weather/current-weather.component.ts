import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent implements OnInit, OnChanges{
  WeatherData:any;
  @Input() lati: number | null = null;
  @Input() long: number | null = null;

  latitude: number| null = null;
  longitude: number| null = null;

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
  }

  getWeatherData(){
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.lati}&lon=${this.long}&exclude=hourly,minutely&appid=b59bdb0f1f92558d4d4e9d9d0989e7cd`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.current.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.current.temp - 273.15).toFixed(0);
    this.WeatherData.status = (this.WeatherData.current.weather[0].main);
    this.WeatherData.temp_feels_like = (this.WeatherData.current.feels_like - 273.15).toFixed(0);
    this.WeatherData.name = (this.WeatherData.timezone);
    this.WeatherData.humidity =(this.WeatherData.current.humidity);
  }
}
