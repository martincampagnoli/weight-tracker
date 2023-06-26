import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-link',
  templateUrl: './circle-link.component.html',
  styleUrls: ['./circle-link.component.scss'],
})
export class CircleLinkComponent {
  @Input() title: string | undefined;
  @Input() link: string | undefined;
  @Input() img: string | undefined;

  constructor() {}
}
