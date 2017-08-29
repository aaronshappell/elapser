import { Component } from '@angular/core';
import {ScreenshotService} from "./shared/screenshot.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	private disableExportButton: boolean = true;

	constructor(private screenshotService: ScreenshotService, public snackBar: MdSnackBar){}

	start(nameInput: string){
		this.disableExportButton = true;
		this.screenshotService.start(nameInput, 0, 1000)
	}

	stop(){
		this.disableExportButton = false;
		this.screenshotService.stop()
	}

	exportVideo(){
		this.disableExportButton = true;
		this.screenshotService.exportVideo();
	}
}
