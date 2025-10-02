import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as reducers from 'src/app/store/default';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { resetGoal, setGoal } from 'src/app/store/default';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatButton,
  ],
})
export class AddGoalComponent {
  private formBuilder = inject(FormBuilder);
  private snackBarUtil: SnackBarUtil = inject(SnackBarUtil);
  private store: Store<reducers.AppState> = inject(Store);
  readonly dialogRef = input.required<MatDialogRef<AddGoalComponent>>();

  protected formGroup = this.formBuilder.group({
    targetWeight: ['', [Validators.required]],
  });

  protected setGoal(): void {
    const targetWeight = Number(this.formGroup.value.targetWeight);

    if (!this.formGroup.valid) {
      return;
    }

    this.store.dispatch(
      setGoal({
        payload: {
          targetWeight,
        },
      })
    );
    this.snackBarUtil.show('Goal set successfully');
    this.dialogRef().close();
  }

  protected reset(): void {
    this.store.dispatch(resetGoal());
    this.dialogRef().close();
  }
}
