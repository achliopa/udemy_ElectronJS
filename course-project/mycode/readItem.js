// Modules
const {BrowserWindow} = require('electron');

//create aglobal for export
let bgItemWin

// New readItem  method
module.exports = (url,callback) => {
	// create new offscreen BrowserWindow
	bgItemWin = new BrowserWindow({
		width: 1000,
		height: 1000,
		show: false,
		webPreferences: {
			offscreen: true
		}
	});

	// Load read item
	bgItemWin.loadURL(url);

	// wait for page to finish loading
	bgItemWin.webContents.on('did-finish-load',()=>{
		// get screenshot (thumbnail)
		bgItemWin.webContents.capturePage((image)=>{
			//get image to data URI
			let screenshot = image.toDataURL();

			//get page title
			let title = bgItemWin.getTitle();

			// return new item via callback
			callback({title, screenshot, url })

			//clean up
			bgItemWin.close();
			bgItemWin = null;
		});
	});
}