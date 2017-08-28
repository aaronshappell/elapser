import { Component, OnInit } from '@angular/core';
import {ScreenshotService} from "../shared/screenshot.service";
const {dialog} = require("electron").remote;

@Component({
	selector: 'app-settings-dialog',
	templateUrl: './settings-dialog.component.html',
	styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
	private selectedImageType = "jpg";
	private imageTypes = [
		{value: "jpg", viewValue: "JPG"},
		{value: "png", viewValue: "PNG"}
	];

	constructor(private screenshotService: ScreenshotService) {}

	ngOnInit() {
	}

	browseForSaveLocation(){
		dialog.showOpenDialog({properties: ["openDirectory", "createDirectory"]}, this.setSaveLocation.bind(this));
	}

	private setSaveLocation(filePaths: String[]){
		if(filePaths){
			this.screenshotService.setSaveLocation(filePaths[0].toString());
		}
	}
}
