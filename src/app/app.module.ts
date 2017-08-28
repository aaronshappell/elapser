import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdDialogModule, MdMenuModule, MdToolbarModule, MdIconModule, MdButtonModule} from "@angular/material";

import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		TitlebarComponent,
		AboutDialogComponent,
		SettingsDialogComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MdDialogModule,
		MdMenuModule,
		MdToolbarModule,
		MdIconModule,
		MdButtonModule
	],
	providers: [],
	entryComponents: [SettingsDialogComponent, AboutDialogComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
