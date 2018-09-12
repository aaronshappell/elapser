const {app, BrowserWindow, ipcMain} = require('electron')
const {autoUpdater} = require('electron-updater')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // TODO: Set icon later
    var winOpts = {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        title: 'Elapser',
        show: false
    }
    if(process.platform === 'darwin'){
        winOpts.titleBarStyle = 'hidden'
    } else{
        winOpts.frame = false
    }

    // Create the browser window.
    win = new BrowserWindow(winOpts)

    // Remove default menu
    win.setMenu(null)

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/build/elapser/index.html`)

    // Open the DevTools.
    win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    // Shows the window when ready
    win.on('ready-to-show', () => {
        win.show()
    })

    // Configure auto updating and check for available updates
    autoUpdater.autoDownload = false
    autoUpdater.checkForUpdates()
}

autoUpdater.on('error', (error) => {
    console.log(error)
})

autoUpdater.on('checking-for-update', () => {
    console.log("checking for update")
})

autoUpdater.on('update-available', (info) => {
    console.log("update available")
    // TODO: notify user of update
})

autoUpdater.on('update-not-available', (info) => {
    console.log("update not available")
    win.webContents.send("updateAvailable")
})

autoUpdater.on('download-progress', (progress) => {
    console.log("download progress: " + progress.percent + "%")
    // TODO: notify user of download progress
})

autoUpdater.on('update-downloaded', (info) => {
    console.log("update downloaded")
    autoUpdater.quitAndInstall();
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

ipcMain.on('minimize', () => {
    win.minimize()
})

ipcMain.on('maximize', () => {
	win.isMaximized() ? win.unmaximize() : win.maximize()
})

ipcMain.on('close', () => {
	win.close()
})

ipcMain.on('downloadUpdate', () => {
    autoUpdater.downloadUpdate()
})