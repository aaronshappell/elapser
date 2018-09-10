const {app, BrowserWindow, ipcMain} = require('electron')

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
}

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
