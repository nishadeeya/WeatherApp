import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from '../common/toaster/toaster.component';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private snackbar: MatSnackBar) { }
  toasterBar(msg, action) {
    this.snackbar.openFromComponent(ToasterComponent, {
      duration: 2000,
      data: { message: msg, action: action },
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['green-snackbar']
    });
  }

}
