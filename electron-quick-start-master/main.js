const electron = require('electron')
const windowStateKeeper = require('electron-window-state');
require("electron-reload")(__dirname)

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function (e) {

  let winState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 600
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({width: winState.width, height: winState.height, x: winState.x, y: winState.y});

  winState.manage(mainWindow);


  mainContents = mainWindow.webContents

  mainContents.on("new-window", (e,url)=> {
    console.log("New Window Created for: "+url);
    e.preventDefault();
    let modalWindow = new BrowserWindow({width: 600, height: 300, modal: true, parent: mainWindow});
    modalWindow.loadURL(url);

    modalWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
      modalWindow = null
    })
  });

  mainContents.on("context-menu", (e,params) => {
    // console.log("Context menu opened on: ", + params.mediaType + " at (x,y):"+ params.x+","+params.y);
    console.log("User selecteed text: "+params.selectionText);
    console.log("Selection can be copied: "+params.editFlags.canCopy);
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
