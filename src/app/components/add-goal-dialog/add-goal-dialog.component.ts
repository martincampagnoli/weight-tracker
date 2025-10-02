import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddGoalComponent } from '../add-goal/add-goal.component';

@Component({
  selector: 'add-goal-dialog',
  templateUrl: 'add-goal-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    AddGoalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGoalDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddGoalDialogComponent>);
}
