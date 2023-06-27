import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../store/reducers';
import * as actions from '../../store/actions';
import { Observable } from 'rxjs';
import { Post } from 'src/app/Models/Post';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  data$: Observable<Array<Post>>;
  constructor(private store: Store<reducers.AppState>) {
    this.data$ = this.store.select(reducers.getData);
    this.store.dispatch(new actions.GetData());
  }

  ngOnInit() {}
}
