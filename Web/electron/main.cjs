const {app, BrowserWindow} = require('electron')
require ('@electron/remote/main').initialize()

function createWindow(){
  console.log("createWindow")
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      enableRemoteModule: true,
    }
  })
  win.loadURL('http://localhost:5173')
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit()
  }
} )

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
} )