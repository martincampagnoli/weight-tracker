import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-link',
  templateUrl: './circle-link.component.html',
  styleUrls: ['./circle-link.component.scss'],
})
export class CircleLinkComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() link: string | undefined;
  @Input() img: string | undefined;

  constructor() {}

  ngOnInit() {}
}
