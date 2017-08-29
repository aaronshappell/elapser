import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms"
import {MdDialogModule, MdMenuModule, MdToolbarModule, MdIconModule, MdButtonModule, MdInputModule, MdSelectModule, MdSnackBarModule} from "@angular/material";

import {ScreenshotService} from "./shared/screenshot.service";

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
		FormsModule,
		MdDialogModule,
		MdMenuModule,
		MdToolbarModule,
		MdIconModule,
		MdButtonModule,
		MdInputModule,
		MdSelectModule,
		MdSnackBarModule
	],
	providers: [ScreenshotService],
	entryComponents: [SettingsDialogComponent, AboutDialogComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
