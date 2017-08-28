import { Component, OnInit } from '@angular/core';
import {ScreenshotService} from "../shared/screenshot.service";
const {dialog} = require("electron").remote;
import {Settings} from "../shared/settings.model";

@Component({
	selector: 'app-settings-dialog',
	templateUrl: './settings-dialog.component.html',
	styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
	private settings: Settings;
	private imageTypes = [
		{value: "jpg", viewValue: "JPG"},
		{value: "png", viewValue: "PNG"}
	];

	constructor(private screenshotService: ScreenshotService) {}

	ngOnInit() {
		this.settings = this.screenshotService.getSettings();
	}

	browseForSaveLocation(){
		dialog.showOpenDialog({properties: ["openDirectory", "createDirectory"]}, (filePaths: String[]) => {
			if(filePaths){
				this.settings.saveLocation = filePaths[0].toString();
				this.updateSettings();
			}
		});
	}

	updateSettings(){
		this.screenshotService.setSettings(this.settings);
	}
}
