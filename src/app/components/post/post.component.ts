import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Post } from 'src/app/Models/Post';
import { Store } from '@ngrx/store';
import * as reducers from '../../store/reducers';
import * as actions from '../../store/actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post: Post | undefined;
  value: string | number | undefined;

  constructor(private store: Store<reducers.AppState>) {}

  ngOnInit(): void {
    this.displayValue();
  }

  ngOnChanges(): void {
    this.displayValue();
  }

  displayValue(): void {
    switch (this.post?.displayKey) {
      case 'USERID': {
        this.value = this.post?.userId;
        break;
      }
      case 'ID': {
        this.value = this.post?.id;
        break;
      }

      case 'BODY': {
        this.value = this.post?.body;
        break;
      }
      default: {
        this.value = this.post?.title;
      }
    }
  }

  changeDisplayValue(): void {
    this.store.dispatch(new actions.UpdateDisplayValue(this.post));
  }
}
