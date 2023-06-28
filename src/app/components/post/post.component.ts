import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { Post } from 'src/app/Models/Post';
import { Store } from '@ngrx/store';
import * as reducers from '../../store/reducers';
import * as actions from '../../store/actions';
export type displayKeys = 'TITLE' | 'USERID' | 'ID' | 'BODY';

const displayKeysArray = ['TITLE', 'USERID', 'ID', 'BODY'] as const;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnChanges {
  @Input() post: Post | undefined;
  value: string | number | undefined;

  constructor(private store: Store<reducers.AppState>) {}

  ngOnChanges(): void {
    this.displayValue();
  }

  displayValue(): void {
    switch (this.post?.displayKey) {
      case displayKeysArray[1]: {
        this.value = this.post?.userId;
        break;
      }
      case displayKeysArray[2]: {
        this.value = this.post?.id;
        break;
      }

      case displayKeysArray[3]: {
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
      displayKeysArray.indexOf(this.post?.displayKey as displayKeys) + 1;
    const n = displayKeysArray.length;
    this.store.dispatch(
      new actions.UpdateDisplayValue({
        post: this.post,
        displayKey: displayKeysArray[((i % n) + n) % n],
      })
    );
  }
}
