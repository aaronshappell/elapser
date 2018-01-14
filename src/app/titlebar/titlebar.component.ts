import { Component, OnInit } from '@angular/core';
import {ipcRenderer} from "electron";
import {MatDialog, MatSidenav} from "@angular/material";
import {SettingsDialogComponent} from "../settings-dialog/settings-dialog.component";
import {AboutDialogComponent} from "../about-dialog/about-dialog.component";

@Component({
	selector: 'app-titlebar',
	templateUrl: './titlebar.component.html',
	styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {
	private framelessControls: boolean;

	constructor(private dialog: MatDialog) { }

	ngOnInit() {
		if(process.platform === "darwin"){
			this.framelessControls = false;
		} else{
			this.framelessControls = true;
		}
	}

	openSettingsDialog(){
		this.dialog.open(SettingsDialogComponent);
	}

	openAboutDialog(){
		this.dialog.open(AboutDialogComponent);
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
