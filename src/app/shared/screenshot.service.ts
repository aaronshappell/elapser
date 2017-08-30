import { Injectable } from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {ipcRenderer} from "electron";
import {Settings} from "./settings.model";
import {Info} from "./info.model";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class ScreenshotService {
	private settings: Settings;
	private defaultSettings = new Settings(path.join(process.env.HOME, "Documents", "Elasper Timelapses"), "jpg");
	private info: Info = new Info();
	private recording: boolean = false;
	private intervalID: number;
	private startTime: number;

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
		ipcRenderer.send("screenshot", path.join(this.settings.saveLocation, this.info.name, "images", `image${this.info.imageIndex}.${this.settings.imageType}`));
		this.info.imageIndex++;
	}

	private writeInfo(){
		fs.writeFile(path.join(this.settings.saveLocation, this.info.name, "timelapse.info"), JSON.stringify(this.info), "utf8", (err) => {
			if(err){
				this.snackBar.open("Error creating info file", "", {duration: 2000});
				throw err;
			}
		});
	}

	private readInfo(timelapseName: string){
		fs.readFile(path.join(this.settings.saveLocation, timelapseName, "timelapse.info"), "utf8", (err, data) => {
			if(err){
				this.snackBar.open("Error opening timelapse", "", {duration: 2000});
				throw err;
			} else{
				this.info = JSON.parse(data);
			}
		});
	}

	private checkForProjectFolder(){
		fs.mkdir(path.join(this.settings.saveLocation, this.info.name), (err) => {
			if(err){
				if(err.code !== "EEXIST"){
					this.snackBar.open("Error creating project folder", "", {duration: 2000});
					throw err;
				}
			} else{
				this.snackBar.open("Project folder created!", "", {duration: 2000});
			}
		});
		fs.mkdir(path.join(this.settings.saveLocation, this.info.name, "images"), (err) => {
			if(err){
				if(err.code !== "EEXIST"){
					this.snackBar.open("Error creating images folder", "", {duration: 2000});
					throw err;
				}
			}
		});
		this.writeInfo();
	}

	start(timelapseName: string, startIndex: number, speed: number){
		if(!this.recording){
			this.recording = true;
			this.startTime = Date.now();
			this.info.imageIndex = startIndex;
			this.info.speed = speed;
			this.info.name = timelapseName;
			if(this.info.elapsedTime === undefined) this.info.elapsedTime = 0;
			this.checkForProjectFolder();
			this.intervalID = setInterval(this.screenshot.bind(this), this.info.speed);
		}
	}

	stop(){
		this.recording = false;
		clearInterval(this.intervalID);
		this.info.elapsedTime += (Date.now() - this.startTime);
		this.writeInfo();
	}

	exportVideo(){
		ipcRenderer.send("exportVideo", this.settings, this.info);
	}

	isRecording(){
		return this.recording;
	}

	getTime(){
		return this.info.elapsedTime + (Date.now() - this.startTime);
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
