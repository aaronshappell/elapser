const {app, BrowserWindow, ipcMain} = require("electron");
var fs = require("fs");
const path = require("path");
const url = require("url");
var childProcess = require("child_process");
const ffmpeg = require("fluent-ffmpeg");

let mainWindow;

var ffmpegPath = `bin/${process.platform}/${process.arch}/ffmpeg` + ((process.platform === "win32") ? ".exe" : "");

var createWindow = function(){
	var windowOptions = {
		width: 800,
		height: 600,
		show: false
	};
	if(process.platform === "darwin"){
		windowOptions.titleBarStyle = "hidden";
	} else{
		windowOptions.frame = false;
	}
	mainWindow = new BrowserWindow(windowOptions);
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "dist", "index.html"),
		protocol: "file:",
		slashes: true
	}));
	mainWindow.webContents.openDevTools();
	mainWindow.on("closed", function(){
		mainWindow = null;
	});
	mainWindow.on("ready-to-show", function(){
		mainWindow.show();
	});
}

app.on("ready", createWindow);
app.on("window-all-closed", function(){
	if(process.platform !== "darwin"){
		app.quit();
	}
});
app.on("activate", function(){
	if(mainWindow === null){
		createWindow();
	}
});

ipcMain.on("minimize", function(){
	mainWindow.minimize();
});
ipcMain.on("maximize", function(){
	mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on("close", function(){
	mainWindow.close();
});

ipcMain.on("exportVideo", function(event, settings, timelapseName){
	var proc = new ffmpeg(`${settings.saveLocation}/${timelapseName}/images/image%d.${settings.imageType}`)
		.setFfmpegPath(ffmpegPath)
		.videoCodec('libx264')
		.inputFps(0.5) //This changes the time that each image is displayed
		.outputFps(60)
		.on("error", (error) => {
			console.log(error);
			event.sender.send("exportVideoError", error);
		})
		.on("end", () => {
			console.log("Export finished");
			event.sender.send("exportVideoFinished");
		})
		.save(`${settings.saveLocation}/${timelapseName}/${timelapseName}.mp4`);
});

ipcMain.on("screenshot", function(event, imagePath){
	screenshot(imagePath, function(error){
		if(error){
			console.log(error);
			event.sender.send("screenshotError", error);
		}
	});
});

var screenshot = function(imagePath, callback){
	var command;
	switch(process.platform){
		case "win32":
			command = childProcess.spawn(path.join(__dirname, "bin", "win32", process.arch, "nircmdc.exe"), ["savescreenshot", imagePath]);
			break;
		case "darwin":
			command = childProcess.spawn("screencapture", ["-x", imagePath]);
			break;
		case "linux":
			command = childProcess.spawn("import", ["-window", "root", imagePath]);
			break;
		default:
			callback("Error: os not supported");
	}
	command.on("close", function(code){
		if(fs.existsSync(imagePath)){
			callback(null);
		} else{
			callback("Error: screenshot not captured");
		}
	});
}