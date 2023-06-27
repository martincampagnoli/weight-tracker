import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../store/reducers';
import * as actions from '../../store/actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  constructor(private store: Store<reducers.AppState>) {
    this.store
      .select(reducers.getData)
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data) {
        }
      });
    this.store.dispatch(new actions.GetData());
  }

  ngOnInit() {}
}
