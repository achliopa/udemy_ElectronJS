// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer} = require('electron');
const remote = require('electron').remote;
// const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;


// dialog.showMessageBox({message: 'A message dialog invoked via renderer.js', buttons: ['OK']});


// let win = new BrowserWindow({width: 400, height: 200});

// win.loadURL('https://google.com');


// console.log(remote);
// // send message to main process on channel1
// ipcRenderer.send("channel1", "Hello from the renderer process")
// ipcRenderer.on("channel1", (e,args)=> {
// 	console.log(args);
// })