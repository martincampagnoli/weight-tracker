import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
})
export class ButtonLinkComponent {
  @Input() label: string | undefined;
  @Input() route: string | undefined;
  @Input() icon: string | undefined;

  constructor() {}
}
