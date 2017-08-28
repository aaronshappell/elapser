import { Injectable } from '@angular/core';
import {ipcRenderer} from "electron";
import * as path from "path";

@Injectable()
export class ScreenshotService {
	private saveLocation: string = path.join(process.env.HOME, "Documents", "Elapser Timelapses");
	private recording: boolean = false;
	private intervalID: number;
	private currentImageIndex: number = 0;
	private speed: number;

	constructor(){
		ipcRenderer.on("screenshotError", function(event, error){
			console.log(error);
		});
	}

	private screenshot(timelapseName: string){
		ipcRenderer.send("screenshot", path.join(this.saveLocation, timelapseName, "images", `image${this.currentImageIndex}.jpg`));
		this.currentImageIndex++;
	}

	start(timelapseName: string, startIndex: number, speed: number){
		if(!this.recording){
			this.recording = true;
			this.currentImageIndex = startIndex;
			this.speed = speed;
			this.intervalID = setInterval(this.screenshot.bind(this), this.speed, timelapseName);
		}
	}

	stop(){
		this.recording = false;
		clearInterval(this.intervalID);
	}

	setSaveLocation(saveLocation: string){
		this.saveLocation = saveLocation;
	}
}
