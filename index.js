const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const isDev = !app.isPackaged;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
           nodeIntegration: true,
        },
    });

    win.loadFile("index.html");
    isDev && win.webContents.openDevTools();
}

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}




app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});