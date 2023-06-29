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
export class PostComponent implements OnChanges {
  @Input() post: Post | undefined;
  value: string | number | undefined;
  keys = reducers.displayKeysArray;

  constructor(private store: Store<reducers.AppState>) {}

  ngOnChanges(): void {
    this.displayValue();
  }

  displayValue(): void {
    switch (this.post?.displayKey) {
      case this.keys[1]: {
        this.value = this.post?.userId;
        break;
      }
      case this.keys[2]: {
        this.value = this.post?.id;
        break;
      }
      case this.keys[3]: {
        this.value = this.post?.body;
        break;
      }
      default: {
        this.value = this.post?.title;
      }
    }
  }

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
