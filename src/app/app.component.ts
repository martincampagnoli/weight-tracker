import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CircleLinkComponent } from './components/circle-link/circle-link.component';
import { MainComponent } from './components/main/main.component';

/**
 * The root component of the Angular application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, CircleLinkComponent, MainComponent],
})
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'assessment';
}
