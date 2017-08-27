import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdDialogModule, MdMenuModule, MdToolbarModule, MdIconModule, MdButtonModule} from "@angular/material";

import { AppComponent } from './app.component';
import { TitlebarComponent } from './titlebar/titlebar.component';

@NgModule({
	declarations: [
		AppComponent,
		TitlebarComponent
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
	bootstrap: [AppComponent]
})
export class AppModule { }
