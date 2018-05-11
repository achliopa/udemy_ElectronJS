// Modules
const {autoUpdater} = require('electron-updater');
const {dialog, BrowserWindow, ipcMain} = require('electron');
//enable logging
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

// disable auto downloading
autoUpdater.autoDownload = false;

// check for updates
exports.check = () => {
	// Start update check
	autoUpdater.checkForUpdates();

	//listen for download(update) found
	autoUpdater.on('update-available', () => {
		
		// track progress percent
		let downloadProgress = 0;

		// prompt user to update
		dialog.showMessageBox({
			type: 'info',
			title: 'Update Available',
			message: 'A new version of Readit is available. Update now?',
			buttons: ['Update','No']
		}, (buttonIndex) => {
			// if not update button, return
			if(buttonIndex!== 0) return

			//else start the download and show download progress window
			autoUpdater.downloadUpdate();
			// Create progress Window
			let progressWin = new BrowserWindow({
				width: 350,
				height: 35,
				useContentSize: true,
				autoHideMenuBar: true,
				maximize: false,
				fullscreen: false,
				fullscreenenable: false,
				resizable:  false
			});

			// load progress HTML
			progressWin.loadURL(`file://${__dirname}/renderer/progress.html`);

			//handle win close
			progressWin.on('closed', () => progressWin = null );

			// listen for progress request from channel
			ipcMain.on('download-progress-request', (e) => {
				e.returnVallue = downloadProgress ;
			});

			// track download progress in autoUpdater
			autoUpdater.on('download-progress', (d)=> {
				downloadProgress = d.percent;
				// autoUpdater.logger.info(downloadProgress);
			});

			//listen for completed update download
			autoUpdater.on('update-downloaded', () => {
				// close progressWIn
				if (progressWin) progressWin.close();

				// promt user to quit aand install
				dialog.showMessageBox({
					type: 'info',
					title: 'Update Ready',
					message: 'A new version of Readit is ready. Quit and install now?',
					buttons: ['Yes','Later']
				}, (buttonIndex) => {
					//udpate if 'yes'
					if(buttonIndex === 0) autoUpdater.quitAndInstall();
				});
			});
		});
	});
};