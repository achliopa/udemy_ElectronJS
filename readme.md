# Udemy Course - Master Electron: Desktop Apps using Javascript HTML & CSS

* [course link]()
* [course repo]()

## Section 1 - Overview

### Lecture 2 - Lesson Structure

* [electron website](https://electronjs.org/)
* [electron quick start app repo](https://github.com/electron/electron-quick-start)
* [atom text editor](https://atom.io/)
* [ES6 feats](https://github.com/lukehoban/es6features#readme)
* [ES6 feats - let & const](https://github.com/lukehoban/es6features#let--const)
* [ES6 feats - arrows](https://github.com/lukehoban/es6features#arrows)
* [ES6 feats - tempalte strings](https://github.com/lukehoban/es6features#template-strings)
* [ES6 Course](https://www.udemy.com/javascript-es6-tutorial/)
* [ES6 Training](https://www.udemy.com/es6-bootcamp-next-generation-javascript/)
* [Learn ES6](https://egghead.io/courses/learn-es6-ecmascript-2015)
* we copy the repo of electron quick start app from github to our machine. a link exists in electron webpage at get started section
* in electron webpage there are links to topics related to building and deploying the app or adding it to apple store. also links to the API docs
* i open the project folder with my editor
* we open the main.js file and we see that electron uses ES6 JS
* we sse it makes heavy use of the Browser window object. there is plenty of info on this in API reference

## Section 2 - Developing with Electron

### Lecture 3 - Install & Run

* [Electron npm module](https://www.npmjs.com/package/electron)
* we want to compile and run the quickstart app
* we will do it using the electron cli. therefore we install electron globally. `npm install -g electron`
*  we see the available commands with `electron --help`
* electron looks for main.js as our project entry point. we can set an other entry point explicitly or pas to electron command the whole project directory and the tool will look form main.js. we choose the second option and run `electron .` inside our project root dir
* we get an error for NSS library version (serverless chrome) so we reinstall it to a latest version with `sudo apt-get install --reinstall libnss3`. we rerun `electron .` and our app it launched successfully. its a boilerplate app. nothing fancy. just hellow world
* we look in the package.json file. there is a start script that does exactly the same. so we can use `npm start` to launch our app.. (so no need to install electron globally)
* also we see inthe package.json that electron is a dev dependency. so if we run `npm install` in our project then we have an installation of electron in the project (so we can delete the global). we do exactly that as we DONT like GLobal installs in our Dev machine where we develop multiple projects
* once npm install finishes we look an node_modules/bin for all dependencies executables. electron is there asa project dependency. we like that.
* we rewrite our start script to use the local dependency electron lib ` "start": "./node_modules/.bin/electron ."` run `npm start` and OK app starts

### Lecture 4 - App Structure

* [main and renderer guide](https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes)
* [sample app architecture](https://electronjs.org/docs/tutorial/first-app)
* electron uses 2 runctime contexts to achive its goal. node.js and chromium (google chrome browser window). we can abstract them as node as server side and chromium as client side
* The main.js when run is the Main Process which is executed by Node. 
* This main process creates a browser window(renderer process) based on the renderer,js which is run in Chromium
* A main process can run multiple renderer processes (multi window app). 
* In any project there will be only one Main Process
* when we run npm start or electron . electron looks for main.js. in package.json there is a variable "main" that points to "main.js" so main process is the main.js executed
* this is where we can set an other js file as main process entry file
* what typically happens in a main.js file
	* first e notice that syntax is mixed ES6 and ES5.
	* we import electron lib, we dont initialize it with some function call. the electron binary will do that when we run elcetron .
	* once the electron is initialized we can access it from the electron library as `electron.app`
	* in this app instance we listen for the ready event. this event tell us the app is ready and we can start creating the UI aka the Browser window that runs in Chromium `app.on('ready`, createWindow)
	* createWindow is a calback that creates the first renderer process. 
	* It creates a BrowserWindow instance named mainWindow. BrowserWindow is imported from electron lib
	* mainWindow is a global so that is not garbage collected by node upon function exit
	* main window is the renderer process ist h UI presented to user with Chromium. it is manageg by main.js from the node environment
	* we load content to the mainWindow object. `mainWindow.loadURL(`file://${_dirname}/index.html`)`
	* in inswx.html we run the script `./renderer.js` because it runs in the context of renderer process or client side. we use require in html becaus eit runs in node.js
	* then we open devtools in browserwindow (mainWindow)
	* we allso add a listenre to the browserWindow close event to discart our global object for housekeeping
	* to understand the app flow we add a bunch of console.logs in main.js . we modify index.html content and add a console log in renderert.js
	* what we see is that console.logs added in main.js are outputed to the terminal (node.js) while console.logs added to renderer.js are outputed to the chromium browser devtools console

### Lecture 5 - Electron Reload

* [npm electron reload pkg](https://www.npmjs.com/package/electron-reload)
* electron reload helps us develop faster in electron. currently our dev flow is: update codebase, close the app, go to terminal, restart the app. 
* electron-reload monitors rclient side files (html, renderer.js) for updates and updates the mainWindow
* the way to add it is easy. we install it `npm install --savew-dev electron-reload`, we import it adding `require("electron-reload")(__dirname)` in main.js (we pass the directory it has to watch for changes). abd restatr the app
* we test it by changing index.html. once saved the changes appear in the UI instantly

### Lecture 6 - Using Native Node Modules on Mac

* [npm node.bcrypt.js pkg](https://www.npmjs.com/package/bcrypt)
* [Using Native Node Modules](https://electronjs.org/docs/tutorial/using-native-node-modules)
* one of the most powerful features of electron is the fact that we have access to all these node modules using npm.
* electron library is prebuilt. it is built against the node binary version installed on our dev system
* to use off the self npm modules with electron with no issues we NEED TO SPECIFY ELLECTRON HEADERS when building NATIVE MODULES. native node modules are modules that get compiled on our system (like bcrypt)
* in Electron documentation we see that there are 3 ways to do it.
	* using npm 
	* installing modules like normal and then rebuilding them for electron
	* manually building for electron
* the first way is the easiest and more practical
* we will see how to use the npm method by means of a helper script.
* first we will do a normal install of a node native package (bcrypt) and use it in our project, build the app and run it. to see what will happen
* in our quick start project we `npm install bcrypt`
* we use bcrypt in our project cping the async impelemntation from its npm pkg webpage

```
// bcrypt async
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const path = require('path')
const url = require('url')
//
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  console.log("Hassed Pasword: "+hash);
});
//
```

* if the lob is properly integrated and compiled in out project we should see the console loged hash in our terminal. SUCCESS. THe author gets a big fat error because he is running on MAC, he gets a version mismatch.
* to fix this he heads back to electron documentation (see link above). in order to use npm instal to install native modules we need to export environment vars about electron

```
# Electron's version.
  export npm_config_target=1.2.3
  # The architecture of Electron, can be ia32 or x64.
  export npm_config_arch=x64
  export npm_config_target_arch=x64
  # Download headers for Electron.
  export npm_config_disturl=https://atom.io/download/electron
  # Tell node-pre-gyp that we are building for Electron.
  export npm_config_runtime=electron
  # Tell node-pre-gyp to build module from source code.
  export npm_config_build_from_source=true
  # Install all dependencies, and store cache to ~/.electron-gyp.
  HOME=~/.electron-gyp npm install
```

* we create a new file in our project dir and cp the above snippet, we set syntax highlighting to shell script
* the way to use this sctipt is to run it in command line passing the name of the npm module we want to install. we modify the last line to `npm install $1` where $1 is the first argument after the shell script file call
* we set the electron version to the correct version (see package.json)
* we leeave the rest as is (if we run on a 32bit machine we change to 32)
* we save the file as *electron.npm*
* we give it execute permissions `chmod +x electron.npm`
* to test it we delete the bcrypt module `npm uninstall bcrypt`
* we install the native node module using the script with `./electron.npm bcrypt`
* we restart the app `npm start` it runs and bcrypt functions OK (probabloy if we were running on MAC the problem would have been solved)

### Lecture 7 - Using Native Node Modules on Windows

* [npm electron-rebuild package](https://www.npmjs.com/package/electron-rebuild)
* [windows build tools](https://www.npmjs.com/package/windows-build-tools)
* in previous lecture we saw how to use native node modules on unix systems
* in this lecture we will see the steps needed to build native node modules on windows. the teacher is on a windows machine to show this. we wont do it. we will follwo along just for educational purposes
* we use same code and same module to show it. just cped the whole project after uninstalling bcrypt and after reoving npde_modules folder
* he goes in project folder in windows and 'npm install electron' locally
* he now wants to install bcrypt.
* in order to install modules that need to be compiled we have to install windows build tools (python based). there are many ways to do it. the easies one is ussing npm. 
* we close the windows cmd terminal and restart it with admin rights
* we install globally the tool using npm `npm install --global --production windows-build-tools`
* we get windows-build-tools folder at windows home dir.in it there is a python27  folder with the python executable. we need to add it to the PATH with the following command from cmd (with admin rights) `setx PYTHON "%USERPROFILE%\.windows-build-tools\python27\python.exe`
* to test it we run in cmd `set PYTHON` and get the path
* we close the cmd w/ admin rights
* we open a standrd cmd prompt
* go back to our porject dir
* run `npm i bcrypt` to install bcrypt locally
* we restart the app `npm start` and get a BIG FAT DLL ERROR (again the same mismatch version error under the hood)
* to solve it we will install yet another npm module called *electron-rebuild*
* we install it globally `npm i g electron-rebuild`
* once installed (while being int the project path) we install bcrypt using electron-rebuild `electron-rebuild -w bcrypt` the -w flag means rebuild
* we restart the app and SUCCESS module integrated with no issues. our app runs bcrypt FLAWLESSLY

### Lecture 8 - Debugging with Devtron

* [devtron](https://electronjs.org/devtron)
* [accessibility info](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules)
* in previous lectures we saw how we can programmatically launch devtools inside of the browser window by adding `mainWindow.webContents.openDevTools()` in our main.js
* now we will learn how to add devtron an extention to the chrome devtools to debug electron
* devtron enhances devtools allowing us to see info on m,odules required linting for electron apps, setup custom event listeners for debugging
* devtron is available as a nod emodule so we install it in our project `npm install --save-dev devtron`. it is chromium specific so OS agnostic aka non-native
* looking at the documentation we can install the extension to our project by running
`require('devtron').install()` in the chromium devTools console. devtron is added to the tools
* to avoid running the command anytime we restart the app we can add the command on top of renderer.js (with precautions so that it runs only in DEVELOPMENT Env)

## Section 3 - Main Process API

### Lecture 9 - App

* [electron.app documentation](https://electronjs.org/docs/api/app)

### Lecture 10 - BrowserWindow Getting Started

* [BrowserWindow documentation](http://electron.atom.io/docs/api/browser-window/)