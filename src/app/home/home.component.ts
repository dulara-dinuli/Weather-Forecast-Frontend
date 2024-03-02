import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  expanded: boolean = false;
  greeting: string = '';
  backgroundUrl: string = '';
  iconClass: string = '';

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
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) {
      this.greeting = 'Hey, Good Morning !';
      this.backgroundUrl = '../../assets/images/day.jpg';
      this.iconClass = 'fa-cloud-sun';
    } else if (currentTime >= 12 && currentTime < 19) {
      this.greeting = 'Hey, Good Evening !';
      this.backgroundUrl = '../../assets/images/eve.jpg';
      this.iconClass = 'fa-cloud';
    } else {
      this.greeting = 'Hey, Good Night !';
      this.backgroundUrl = '../../assets/images/night.jpg';
      this.iconClass = 'fa-moon';
    }
    this.updateBackground();
  }

  updateBackground(): void {
    const backgroundPic = document.getElementById('backgroundPic');
    if (backgroundPic) {
      backgroundPic.style.backgroundImage = `url('${this.backgroundUrl}')`;
    }
  }
}