// Modules
const {app, BrowserWindow, TouchBar} = require('electron')
const path = require('path')
const url = require('url')

// TouchBar Modules
const {TouchBarLabel, TouchBarButton, TouchBarSpacer, TouchBarColorPicker, TouchBarSlider, TouchBarPopover} = TouchBar

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Touch Bar Spacer
const tbSpacer = new TouchBarSpacer({
  size: 'flexible'
})

// Touch Bar Button
const tbButton = new TouchBarButton({
  label: 'Update',
  icon: path.join(__dirname, 'reload@2x.png'),
  iconPosition: 'left',
  click: () => {
    app.relaunch()
    app.exit(0)
  }
})

// Touch Bar Color Picker
const tbPicker = new TouchBarColorPicker()

// Touch Bar Slider
const tbSlider = new TouchBarSlider({
  label: 'Size',
  minValue: 500,
  maxValue: 1000
})

// Touch Bar Label
const tbLabel = new TouchBarLabel({
  label:'Theme:'
})

// Large Touch Bar Spacer
const tbLargeSpacer = new TouchBarSpacer({
  size: 'large'
})

// Touch Bar Popover
const tbPopover = new TouchBarPopover({
  items: new TouchBar([tbSlider]),
  label: 'Size'
})

// Create TouchBar
const touchBar = new TouchBar([ tbLabel, tbPicker, tbLargeSpacer, tbPopover, tbSpacer, tbButton ])

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Add Touch Bar to mainWindow
  mainWindow.setTouchBar(touchBar)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
