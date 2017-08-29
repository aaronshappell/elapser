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
	private startTime: number;
	private speed: number;
	private timelapseName: string;
	private settings: Settings;
	private defaultSettings = new Settings(path.join(process.env.HOME, "Documents", "Elasper Timelapses"), "jpg");

	constructor(public snackBar: MdSnackBar){
		ipcRenderer.on("screenshotError", (event, error) => {
			console.log(error);
			this.snackBar.open("Error taking screenshot, recording stopped", "", {duration: 2000});
			this.stop();
		});
		ipcRenderer.on("exportVideoError", (event, error) => {
			this.snackBar.open("Error during export", "", {duration: 2000});
		});
		ipcRenderer.on("exportVideoFinished", () => {
			this.snackBar.open("Export finished!", "", {duration: 2000}); //Add open action
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

	private screenshot(){
		ipcRenderer.send("screenshot", path.join(this.settings.saveLocation, this.timelapseName, "images", `image${this.currentImageIndex}.${this.settings.imageType}`));
		this.currentImageIndex++;
	}

	start(timelapseName: string, startIndex: number, speed: number){
		if(!this.recording){
			this.recording = true;
			this.currentImageIndex = startIndex;
			this.startTime = Date.now();
			this.speed = speed;
			this.timelapseName = timelapseName;
			this.intervalID = setInterval(this.screenshot.bind(this), this.speed);
		}
	}

	stop(){
		this.recording = false;
		clearInterval(this.intervalID);
	}

	exportVideo(){
		ipcRenderer.send("exportVideo", this.settings, this.timelapseName);
	}

	isRecording(){
		return this.recording;
	}

	getTime(){
		return Date.now() - this.startTime;
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
