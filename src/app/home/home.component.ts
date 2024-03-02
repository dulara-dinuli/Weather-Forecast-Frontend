import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrentWeatherComponent } from "../current-weather/current-weather.component";
import { withInterceptors } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterLink, CurrentWeatherComponent]
})
export class HomeComponent implements OnInit{

  expanded: boolean = false;
  greeting: string = '';
  backgroundUrl: string = '';
  iconClass: string = '';
  theam: string = '';

  ngOnInit(): void {
    this.setGreetingAndBackground();
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
    // const currentTime = new Date().getHours();
    const currentTime = 15;
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
}