const {app, BrowserWindow, ipcMain} = require("electron");
var fs = require("fs");
const path = require("path");
const url = require("url");
var childProcess = require("child_process");

let mainWindow;

var createWindow = function(){
	mainWindow = new BrowserWindow({width: 800, height: 600, show: false, frame: false});
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
	screenshot(path.join(process.env.HOME, "Documents", "Elapser Timelapses", "test", "images", "test.jpg"), function(error){
		if(error){
			console.log(error);
		}
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