const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

var createWindow = function(){
	mainWindow = new BrowserWindow({width: 800, height: 600, show: false, frame: false});
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "dist/index.html"),
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