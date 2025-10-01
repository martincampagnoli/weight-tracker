import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddEntryComponent } from '../add-entry/add-entry.component';

@Component({
  selector: 'add-entry-dialog',
  templateUrl: 'add-entry-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    AddEntryComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEntryDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddEntryDialogComponent>);
}
