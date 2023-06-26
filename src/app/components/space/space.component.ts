import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../store/reducers';
import * as actions from '../../store/actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
})
export class SpaceComponent {
  loading: boolean = false;

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
}
