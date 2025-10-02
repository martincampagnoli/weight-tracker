import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ViewProgressComponent } from '../view-progress/view-progress.component';

@Component({
  selector: 'view-progress-dialog',
  templateUrl: 'view-progress-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    ViewProgressComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProgressDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ViewProgressDialogComponent>);
}
