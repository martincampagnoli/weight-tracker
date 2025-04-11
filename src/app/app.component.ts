import { Component } from '@angular/core';

/**
 * The root component of the Angular application.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  /**
   * The title of the application.
   */
  title = 'assessment';
}
