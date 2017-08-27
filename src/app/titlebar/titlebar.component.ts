import { Component, OnInit } from '@angular/core';
import {ipcRenderer} from "electron";
import {MdDialog, MdSidenav} from "@angular/material";
//import {SettingsDialogComponent} from "../settings-dialog/settings-dialog.component";
//import {AboutDialogComponent} from "../about-dialog/about-dialog.component";

@Component({
	selector: 'app-titlebar',
	templateUrl: './titlebar.component.html',
	styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

	constructor(private dialog: MdDialog) { }

	ngOnInit() {
	}

	openSettingsDialog(){
		//this.dialog.open(SettingsDialogComponent);
	}

	openAboutDialog(){
		//this.dialog.open(AboutDialogComponent);
	}

	minimize(){
		ipcRenderer.send("minimize")
	}

	maximize(){
		ipcRenderer.send("maximize");
	}

	close(){
		ipcRenderer.send("close");
	}
}
