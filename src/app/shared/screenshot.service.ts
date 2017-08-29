import { Injectable } from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {ipcRenderer} from "electron";
import {Settings} from "./settings.model";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class ScreenshotService {
	private recording: boolean = false;
	private intervalID: number;
	private currentImageIndex: number = 0;
	private speed: number;
	private settings: Settings;
	private defaultSettings = new Settings(path.join(process.env.HOME, "Documents", "Elasper Timelapses"), "jpg");

	constructor(public snackBar: MdSnackBar){
		ipcRenderer.on("screenshotError", (event, error) => {
			console.log(error);
			this.snackBar.open("Error taking screenshot, recording stopped", "", {duration: 2000});
			this.stop();
		});
		fs.readFile(path.join(".", "settings.json"), "utf8", (err, data) => {
			if(err){
				if(err.code === "ENOENT"){
					fs.writeFile(path.join(".", "settings.json"), JSON.stringify(this.defaultSettings), "utf8", (err) => {
						if(err){
							this.snackBar.open("Error creating default settings file", "", {duration: 2000});
							throw err;
						} else{
							this.settings = this.defaultSettings;
							this.snackBar.open("Created default settings file", "", {duration: 2000});
						}
					});
				} else{
					this.snackBar.open("Error opening settings file", "", {duration: 2000});
					throw err;
				}
			} else{
				this.settings = JSON.parse(data);
			}
		});
	}

	private screenshot(timelapseName: string){
		ipcRenderer.send("screenshot", path.join(this.settings.saveLocation, timelapseName, "images", `image${this.currentImageIndex}.${this.settings.imageType}`));
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

	isRecording(){
		return this.recording;
	}

	getSettings(){
		return this.settings;
	}

	setSettings(settings: Settings){
		this.settings = settings;
		fs.writeFile(path.join(".", "settings.json"), JSON.stringify(this.settings), "utf8", (err) => {
			if(err){
				this.snackBar.open("Error saving settings", "", {duration: 2000});
				throw err;
			} else{
				this.snackBar.open("Settings saved!", "", {duration: 2000});
			}
		});
	}
}
