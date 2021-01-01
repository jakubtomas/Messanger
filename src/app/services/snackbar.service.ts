import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {}

  successMsg(msg: string): void {
    this.snackbar.open(msg, 'OK', {
      panelClass: 'greenSnackBarAction',
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  errorMsg(msg: string): void {
    this.snackbar.open(msg, 'OK', {
      panelClass: 'redSnackBarAction',
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
