import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Type,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { getData } from 'src/app/store/default';
import { EntryComponent } from '../entry/entry.component';
import * as reducers from 'src/app/store/default';
import { MatDialog } from '@angular/material/dialog';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { ViewProgressDialogComponent } from '../view-progress-dialog/view-progress-dialog.component';
import { AddGoalDialogComponent } from '../add-goal-dialog/add-goal-dialog.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIcon,
    MatButton,
    MatPaginator,
    EntryComponent,
    ProgressBarComponent,
  ],
})
export class DashboardComponent {
  readonly dialog = inject(MatDialog);
  private store: Store = inject(Store);
  protected filteredData = toSignal(this.store.select(reducers.getDataState), {
    initialValue: [],
  });

  protected goal = toSignal(this.store.select(reducers.getTargetWeight), {
    initialValue: undefined,
  });

  lowValue = 0;
  highValue = 3;
  pageSize = 3;
  pageSizeOptions = [3, 9, 30, 90];

  constructor() {
    this.store.dispatch(getData());
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  openDialog(type: string): void {
    let component: Type<
      | AddEntryDialogComponent
      | AddGoalDialogComponent
      | ViewProgressDialogComponent
    >;
    switch (type) {
      case 'viewProgress':
        component = ViewProgressDialogComponent;
        break;
      case 'setWeightGoal':
        component = AddGoalDialogComponent;
        break;
      default:
        component = AddEntryDialogComponent;
    }

    this.dialog.open(component, {
      width: '400px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });
  }
}
