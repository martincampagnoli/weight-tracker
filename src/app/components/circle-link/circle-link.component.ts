import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Component representing a circular link with an image and title.
 */
@Component({
    selector: 'app-circle-link',
    templateUrl: './circle-link.component.html',
    styleUrls: ['./circle-link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CircleLinkComponent {
  /**
   * The title of the circular link.
   */
  @Input() title: string | undefined;

  /**
   * The URL link associated with the circular link.
   */
  @Input() link: string | undefined;

  /**
   * The URL of the image to be displayed within the circular link.
   */
  @Input() img: string | undefined;

  /**
   * Constructs the CircleLinkComponent.
   */
  constructor() {}
}
