import { Component, DestroyRef, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { Store } from '@ngrx/store';
import { deleteEntrySuccess } from 'src/app/store/default';
import { SnackBarUtil } from 'src/app/utils/snackbar.util';
import { Entry } from 'src/app/models/Entry';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatCardSubtitle,
    MatCardHeader,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    CommonModule,
    MatFormFieldModule,
  ],
})
export class EntryComponent {
  private store: Store = inject(Store);
  private snackBarUtil: SnackBarUtil = inject(SnackBarUtil);
  private destroyRef = inject(DestroyRef);
  readonly entry = input.required<Entry>();
  readonly dialog = inject(MatDialog);

  deleteEntry(): void {
    this.store.dispatch(
      deleteEntrySuccess({ payload: { id: this.entry().id } })
    );
    this.snackBarUtil.show('Entry deleted successfully');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { entryId: this.entry().id },
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirm) => {
        if (confirm) {
          this.deleteEntry();
        }
      });
  }
}
