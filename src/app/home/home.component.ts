import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  expanded: boolean = false;

  expandCarousel(): void {
    this.expanded = !this.expanded;
    const viewElement = document.getElementById("view");
    if (viewElement && viewElement.innerHTML == "View More") {
      viewElement.innerHTML = "View Less";
    } else if (viewElement) {
      viewElement.innerHTML = "View More";
    }
  }

}
