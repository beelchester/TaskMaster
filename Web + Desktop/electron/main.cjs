const {app, BrowserWindow} = require('electron')
require ('@electron/remote/main').initialize()

function createWindow(){
  console.log("createWindow")
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      enableRemoteModule: true,
    }
  })
  win.loadURL('https://taskmaster0.netlify.app/')
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