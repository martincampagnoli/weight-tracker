import { Component, inject, input } from '@angular/core';
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
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
} from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { createEntry } from 'src/app/store/default';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss'],
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatStepper,
    MatStep,
    MatButton,
    MatStepperNext,
    MatStepLabel,
    MatDatepickerModule,
  ],
})
export class AddEntryComponent {
  private formBuilder = inject(FormBuilder);
  private snackBarUtil: SnackBarUtil = inject(SnackBarUtil);
  private store: Store<reducers.AppState> = inject(Store);
  readonly dialogRef = input.required<MatDialogRef<AddEntryComponent>>();

  firstFormGroup = this.formBuilder.group({
    weight: ['', [Validators.required, Validators.maxLength(25)]],
  });
  secondFormGroup = this.formBuilder.group({
    date: ['', Validators.required],
  });
  thirdFormGroup = this.formBuilder.group({
    description: [''],
  });

  private formatDate = (iso: string | null | undefined): string => {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getFullYear()}`;
  };

  addEntry(): void {
    const weight = Number(this.firstFormGroup.value.weight);
    const date = this.formatDate(this.secondFormGroup.value.date);
    const description = this.thirdFormGroup.value.description || '';

    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid) {
      return;
    }

    this.store.dispatch(
      createEntry({
        payload: {
          weight,
          date,
          description,
        },
      })
    );
    this.snackBarUtil.show('Entry added successfully');
    this.dialogRef().close();
  }
}
