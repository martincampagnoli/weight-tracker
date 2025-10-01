import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { getData } from 'src/app/store/default';
import { EntryComponent } from '../entry/entry.component';
import { Entry } from 'src/app/models/Entry';
import * as reducers from 'src/app/store/default';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIcon, MatButton, MatPaginator, EntryComponent],
})
export class DashboardComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  store: Store = inject(Store);
  filteredData: Array<Entry> = [];

  lowValue = 0;
  highValue = 3;
  pageSize = 3;
  pageSizeOptions = [3, 9, 30, 90];

  ngOnInit(): void {
    this.store.dispatch(getData());

    this.store
      .select(reducers.getDataState)
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.filteredData = data;
      });
  }

  getPaginatorData(event: any): any {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  openDialog(): void {}
}
