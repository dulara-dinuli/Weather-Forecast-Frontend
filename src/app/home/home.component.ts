import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrentWeatherComponent } from "../current-weather/current-weather.component";
import { FormsModule } from '@angular/forms';
import { WeatherTemplateComponent } from "../weather-template/weather-template.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterLink, CurrentWeatherComponent, FormsModule, WeatherTemplateComponent]
})
export class HomeComponent implements OnInit{

  expanded: boolean = false;
  greeting: string = '';
  backgroundUrl: string = '';
  iconClass: string = '';
  theam: string = '';
  latitude: number=6.927079;
  longitude: number=79.861244;

  days = [0, 1, 2, 3, 4, 5, 6];

  WeatherDataWeek:any;

  ngOnInit(): void {
    this.WeatherDataWeek = {
      main : {},
      isDay: true
    };
    this.setGreetingAndBackground();
    this.getWeatherDataWeek();
  }

  expandCarousel(): void {
    this.expanded = !this.expanded;
    const viewElement = document.getElementById("view");
    if (viewElement && viewElement.innerHTML == "View More") {
      viewElement.innerHTML = "View Less";
    } else if (viewElement) {
      viewElement.innerHTML = "View More";
    }
  }

  setGreetingAndBackground(): void {
    const currentTime = new Date().getHours();
    // const currentTime = 25;
    if (currentTime >= 5 && currentTime < 12) {
      this.greeting = 'Hey, Good Morning !';
      this.backgroundUrl = '../../assets/images/day.jpg';
      this.iconClass = 'fa-cloud-sun';
      this.theam = 'dark';
    } else if (currentTime >= 12 && currentTime < 19) {
      this.greeting = 'Hey, Good Evening !';
      this.backgroundUrl = '../../assets/images/eve.jpg';
      this.iconClass = 'fa-cloud';
      this.theam = 'dark';
    } else {
      this.greeting = 'Hey, Good Night !';
      this.backgroundUrl = '../../assets/images/night.jpg';
      this.iconClass = 'fa-moon';
      this.theam = 'light';
      

    }
    this.updateBackground();
  }

  updateBackground(): void {
    const backgroundPic = document.getElementById('backgroundPic');
    const viewElement = document.getElementById("view");
    const logoElement = document.getElementById("logoContainer") as HTMLImageElement;

    if (backgroundPic) {
      backgroundPic.style.backgroundImage = `url('${this.backgroundUrl}')`;
    }
    if (viewElement && logoElement) {
      if(this.theam=='light'){
        viewElement.style.color = "#ffff";
        logoElement.src = "../../assets/images/logoWhite.png";
      }else if (this.theam=='dark'){
        viewElement.style.color = "#0b001b";
        logoElement.src = "../../assets/images/logoBlack.png";
      }
    }
  }

  getWeatherDataWeek(){
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.latitude}&lon=${this.longitude}&exclude=hourly,minutely&appid=0e883e6804a0c01f9d8410ffd05b4976`;
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>{this.setWeatherDataWeek(data);})
  }

  setWeatherDataWeek(data: any){
    this.WeatherDataWeek = data;
    console.log(this.WeatherDataWeek);
  }

  Item(day: number){
    this.WeatherDataWeek.temp_celciusWeek = (this.WeatherDataWeek.daily[day].temp.day - 273.15).toFixed(0);
    this.WeatherDataWeek.statusWeek = (this.WeatherDataWeek.daily[day].summary);
    this.WeatherDataWeek.temp_feels_likeWeek = (this.WeatherDataWeek.daily[day].feels_like.day - 273.15).toFixed(0);
    this.WeatherDataWeek.nameWeek = (this.WeatherDataWeek.timezone);
    this.WeatherDataWeek.humidityWeek =(this.WeatherDataWeek.daily[day].humidity);
  }

  search() {
    this.getWeatherDataWeek(); 
  }
}