import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Component representing a button-styled link with label, route, and icon.
 */
@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLinkComponent {
  /**
   * The label text for the button-styled link.
   */
  @Input() label: string | undefined;

  /**
   * The route URL for navigation when the button-styled link is clicked.
   */
  @Input() route: string | undefined;

  /**
   * The name or class of the icon to be displayed within the button-styled link.
   */
  @Input() icon: string | undefined;

  /**
   * Constructs the ButtonLinkComponent.
   */
  constructor() {}
}
