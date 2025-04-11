import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

/**
 * Component representing a button-styled link with label, route, and icon.
 */
@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, RouterLink],
})
export class ButtonLinkComponent {
  /**
   * The label text for the button-styled link.
   */
  readonly label = input.required<string>();

  /**
   * The route URL for navigation when the button-styled link is clicked.
   */
  readonly route = input.required<string>();

  /**
   * The name or class of the icon to be displayed within the button-styled link.
   */
  readonly icon = input.required<string>();

  /**
   * Constructs the ButtonLinkComponent.
   */
  constructor() {}
}
