import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Store } from '@ngrx/store';
import * as reducers from '../../store/reducers';
import * as actions from '../../store/actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() post: Post | undefined;
  value: string | number | undefined;
  keys = reducers.displayKeysArray;

  constructor(private store: Store<reducers.AppState>) {}

  changeDisplayValue(): void {
    const i =
      this.keys.indexOf(this.post?.displayKey as reducers.DisplayKeys) + 1;
    const n = this.keys.length;
    this.store.dispatch(
      new actions.UpdateDisplayValue({
        post: this.post,
        displayKey: this.keys[((i % n) + n) % n],
      })
    );
  }
}
