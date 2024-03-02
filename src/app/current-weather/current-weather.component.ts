import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent implements OnInit{
  WeatherData:any;
  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat=6.927079&lon=79.861244&exclude=hourly,daily&appid=0e883e6804a0c01f9d8410ffd05b4976')
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
    this.WeatherData.name = "Colombo";
  }
}
