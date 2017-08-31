import { Component, ChangeDetectorRef } from '@angular/core';
import {ScreenshotService} from "./shared/screenshot.service";
import {ipcRenderer} from "electron";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	private disableExportButton: boolean = true;
	private exportProgress: number = 0;
	private exporting: boolean = false;

	constructor(private cdRef: ChangeDetectorRef, private screenshotService: ScreenshotService){
		ipcRenderer.on("exportVideoProgress", (event, progress) => {
			this.exportProgress = progress;
			this.cdRef.detectChanges();
		});
		ipcRenderer.on("exportVideoError", (event, error) => {
			this.exportProgress = 0;
			this.disableExportButton = false;
			this.exporting = false;
		});
		ipcRenderer.on("exportVideoFinished", () => {
			this.exportProgress = 0;
			this.disableExportButton = false;
			this.exporting = false;
		});
	}

	start(nameInput: string){
		this.disableExportButton = true;
		this.screenshotService.start(nameInput, 0, 1000);
	}

	stop(){
		this.disableExportButton = false;
		this.screenshotService.stop();
	}

	exportVideo(){
		this.disableExportButton = true;
		this.exporting = true;
		this.screenshotService.exportVideo();
	}
}
