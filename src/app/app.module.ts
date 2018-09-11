import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from './material.module';

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
    FormsModule,
    MaterialModule
  ],
  providers: [],
  entryComponents: [SettingsComponent, AboutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
