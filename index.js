const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
let win;
function createWindow () {
    win = new BrowserWindow({
        backgroundColor: '#002b36',
        width: 1000,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        },
        icon:'./assets/stilized.png'
    })
    win.loadFile('./views/home.html')
}
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
app.whenReady().then(createWindow)

ipcMain.on('asynchronous-message', (event, arg) => {    
    if (arg[0] == "changePage") {
        win.loadFile('./views/'+arg[1])
    }   
})