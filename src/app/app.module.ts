import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [SettingsComponent, AboutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
