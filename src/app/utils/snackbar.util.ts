import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarUtil {
  matSnackBar = inject(MatSnackBar);

  show(message: string): void {
    this.matSnackBar.open(message, '', {
      duration: 2000,
    });
  }
}
