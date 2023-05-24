import { Injectable, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  constructor(private snackBar: MatSnackBar) { }

  open(type: string, title: any, msg: any) {
    this.snackBar.openFromComponent(SnackBarToastrComponent, {
      data: { message: msg, title: title, type: type },
      panelClass: ['snackAlert', `accel-bg-${type === 'error' ? 'danger' : type}`, 'text-white', 'py-2'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: type !== 'warning' ? 3000000 : 1000000
    });
  };

}

@Component({
  selector: 'snack-bar-component',
  template: `<div class="d-flex flex-row ">
                <div class="col-1 px-1 d-flex align-items-center">
                  <i style="font-size: 1.5em;" attr.class=icon-{{headIcon}}></i>
                </div>
                <div class="col-10 d-flex flex-column py-2">
                  <strong>{{title}}</strong>
                  <span>{{message}}</span>
                </div>
                <div class="col-1 pr-0 text-right">
                  <font class="text-white crsr_pntr" size="1" (click)="closeToastr();">
                    <p class="icon-x"> <b>X</b></p>
                  </font>
                </div>
            </div>`,
  styles: [`.mat-snack-bar-container {
    margin: 60px 40px !important;
} `],
  providers: [ToastrService],
  encapsulation: ViewEncapsulation.None
})
export class SnackBarToastrComponent {
  title: any = 'Title';
  message: any = 'Message';
  headIcon: any = 'check';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackRef: MatSnackBarRef<SnackBarToastrComponent>) {
    this.title = this.data && this.data.title ? this.data.title : 'Title';
    this.message = this.data && this.data.message ? this.data.message : 'Message';
    if (this.data.type === 'error') {
      this.headIcon = 'blocked'
    } else if (this.data.type === 'success') {
      this.headIcon = 'check'
    } else if (this.data.type === 'warning') {
      this.headIcon = 'error'
    } else {
      this.headIcon = this.data.type;
    };
  };
  closeToastr() {
    this.snackRef.dismiss();
  }

}
