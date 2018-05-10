const {BrowserWindow} = require('electron');

//BrowserWindow instance

exports.win;

exports.createWindow = () => {
  // Create the browser window.
  this.win = new BrowserWindow({
    width: 500, 
    height: 650,
    minWidth: 350,
    minHeight: 650,
    icon: `${__dirname}/icons/64x64.png`
  });

  // and load the main.html of the app.
  this.win.loadURL(`file://${__dirname}/renderer/main.html`);

  // Emitted when the window is closed.
  this.win.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    this.win = null
  })
}
