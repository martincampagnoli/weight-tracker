import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../store/reducers';
import * as actions from '../../store/actions';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Post } from 'src/app/models/Post';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
  ],
})
export class GridComponent {
  data$: Observable<Array<Post>>;
  loading: boolean = false;
  keys = reducers.displayKeysArray;

  constructor(
    private store: Store<reducers.AppState>,
    private ref: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {
    this.store
      .select(reducers.isLoading)
      .pipe(takeUntilDestroyed())
      .subscribe((loading) => {
        this.loading = loading as boolean;
        this.ref.markForCheck();
      });
    this.store
      .select(reducers.getError)
      .pipe(takeUntilDestroyed())
      .subscribe((e) => {
        this.snackBar.open(e?.error?.message, undefined, { duration: 2000 });
      });
    this.data$ = this.store.select(reducers.getData);
    this.store.dispatch(new actions.GetData());
  }
}
