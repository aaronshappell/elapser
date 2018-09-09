import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: []
})
export class MaterialModule { }
