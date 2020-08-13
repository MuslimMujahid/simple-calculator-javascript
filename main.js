const { app, BrowserWindow } = require('electron')
const bodyParser = require('body-parser')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 538,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.setMenu(null)
    win.loadFile('app.html')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
        createWindow()
    }
})