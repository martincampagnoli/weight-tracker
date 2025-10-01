import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { getData } from 'src/app/store/default';
import { EntryComponent } from '../entry/entry.component';
import { Entry } from 'src/app/models/Entry';
import * as reducers from 'src/app/store/default';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIcon, MatButton, MatPaginator, EntryComponent],
})
export class DashboardComponent {
  readonly dialog = inject(MatDialog);
  private store: Store = inject(Store);
  protected filteredData: Array<Entry> = [];

  lowValue = 0;
  highValue = 3;
  pageSize = 3;
  pageSizeOptions = [3, 9, 30, 90];

  constructor() {
    this.store
      .select(reducers.getDataState)
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.filteredData = data;
      });
    this.store.dispatch(getData());
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  openDialog(): void {
    this.dialog.open(AddEntryDialogComponent, {
      width: '400px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });
  }
}
