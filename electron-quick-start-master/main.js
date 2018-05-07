const electron = require('electron')
const windowStateKeeper = require('electron-window-state');
require("electron-reload")(__dirname)
// const session = electron.session
// const dialog = electron.dialog
// const globalShortcut = electron.globalShortcut;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const Tray = electron.Tray;
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow



const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;

let contextMenu = new Menu.buildFromTemplate([
  {role: 'copy'},
  {role: 'paste'},
  {type: 'separator'},
  {role: 'undo'},
  {role: 'redo'}
]);

let tray;

function createTray(){
  tray = new Tray('food.png');
  tray.setToolTip('Electron App');
  tray.setContextMenu(contextMenu) 
}



// function showDialog(){
//   let buttons =['Yes','No','Maybe']
//   dialog.showMessageBox({buttons, title: 'Electron Message DIalog', message: 'Please Select an answer', detail: 'A more descriptive message' }, (buttonIndex)=>{
//     console.log("user selected: "+buttons[buttonIndex]);
//   });
// }



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function (e) {
  electron.powerMonitor.on('suspend',()=> {
      console.log('system going to sleep')
  });
    createTray();
  let winState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 600
  });
  // let appSession = session.fromPartition('persist:partition1');
  // Create the browser window.
  mainWindow = new BrowserWindow({width: winState.width, height: winState.height, x: winState.x, y: winState.y});
  // altWindow = new BrowserWindow({width: 700,height: 600, webPreferences: {partition: `persist:partition1`}} );
  winState.manage(mainWindow);

   // Menu.setApplicationMenu(mainMenu)

  mainWindow.webContents.on("context-menu", (e) => {
    e.preventDefault();
    contextMenu.popup();
  });

  // let defaultSession = session.defaultSession;

  // let mainSession = mainWindow.webContents.session; 
  // let altSession = altWindow.webContents.session; 

  // setTimeout(showDialog,2000);

  // globalShortcut.register('g', () => {
  //   console.log('User pressed g');

  //   globalShortcut.unregister('g');
  // });

  // mainSession.cookies.get({}, (err,cookies)=>{
  //   console.log(cookies);
  // });
  // mainSession.cookies.set({url: 'https://myapp.com', name: 'cookie1',value: 'cookie_value',domain: 'myapp.com', expirationDate: 999999999999999},(err)=>{
  //   console.log('Cookies Set');
  //   mainSession.cookies.get({}, (err,cookies)=>{
  //     if(err){
  //       console.log(err);
  //     } else {
  //       console.log(cookies);
  //     }
  //   });
  // });

  // mainSession.on("will-download", (e,downloadItem,webContent)=> {
  //   let file = console.log(downloadItem.getFilename);
  //   downloadItem.setSavePath('downloads/'+file);

  //   let size = downloadItem.getTotalBytes();

  //   downloadItem.on("updated",(e, state)=>{
  //     let progress = Math.round((downloadItem.getReceivedBytes() / size) * 100);

  //     if (state === 'preogressing'){
  //       console.log(progress+'%')
  //     }
  //   });
  // });

  // mainSession.clearStorageData();
  // altSession.clearStorageData();
  // console.log(Object.is(appSession,altSession));
  // mainContents = mainWindow.webContents


  // mainContents.on("new-window", (e,url)=> {
  //   console.log("New Window Created for: "+url);
  //   e.preventDefault();
  //   let modalWindow = new BrowserWindow({width: 600, height: 300, modal: true, parent: mainWindow});
  //   modalWindow.loadURL(url);

  //   modalWindow.on('closed', function () {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //     modalWindow = null
  //   })
  // });

  // mainContents.on("context-menu", (e,params) => {
  //   // console.log("Context menu opened on: ", + params.mediaType + " at (x,y):"+ params.x+","+params.y);
  //   console.log("User selecteed text: "+params.selectionText);
  //   console.log("Selection can be copied: "+params.editFlags.canCopy);
  // });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // altWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // altWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  // altWindow.on('closed', function () {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   altWindow = null
  // })

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
