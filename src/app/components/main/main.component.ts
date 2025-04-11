import { Component } from '@angular/core';
import { ButtonLinkComponent } from '../button-link/button-link.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [ButtonLinkComponent],
})
export class MainComponent {
  constructor() {}
}
