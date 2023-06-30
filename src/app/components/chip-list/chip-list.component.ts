import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
})
export class ChipListComponent {
  @Input() elements: Array<any> | undefined;

  constructor() {}
}
