import { Component, inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
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
export class EntryComponent implements OnInit {
  store: Store = inject(Store);
  snackBarUtil: SnackBarUtil = inject(SnackBarUtil);
  @Input() entry: any;
  @Input() index: number | undefined;
  readonly dialog = inject(MatDialog);
  editingField: string | null = null;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {}

  private formatDate = (iso: string | null | undefined): string => {
    if (!iso) return '';
    const d = new Date(iso.toString().endsWith('Z') ? iso : iso + 'Z');
    return `${d.getUTCDate().toString().padStart(2, '0')}-${(
      d.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${d.getUTCFullYear()}`;
  };

  deleteEntry(): void {
    this.store.dispatch(
      deleteEntrySuccess({ payload: { id: this.entry.id } })
    );
    this.snackBarUtil.show('Entry deleted successfully');
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { entryId: this.entry.id },
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deleteEntry();
      }
    });
  }
}
