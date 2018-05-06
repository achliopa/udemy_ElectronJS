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
* electron.app controls our application's event lifecycle
* *ready* event fires when the app has launced successfully. in quickstart project he called createWindow callback func to ste the BrowserWindow instance
* we clean up form previous sections code the quickstar project
* we make createWIndow an anonymous function, cut it and add it as ready events callback
* we add a console.log at its start
* we start the app and see the log message at window launch
* we can probe the ready status of the app at any momenth with the `app.isReady()` call. we add this at var initialization part of our code. we start thea pp and see false. we add it in a setTimeout callback and see true as it gets acalled after the app launches

```
setTimeout(function(){
  console.log(app.isReady());
},3000)
```

* we can use this prope and event to read a file or start a remote connection at app start.
* ready event has an event object we can pass in our anonymous callback function an log it.

```
{ preventDefault: [Function: preventDefault],
  sender: 
   App {
     domain: null,
     _events: 
      { login: [Function],
        'certificate-error': [Function],
        'select-client-certificate': [Function],
        quit: [Function],
        'web-contents-created': [Function],
        'session-created': [Function],
        'will-quit': [Function],
        ready: [Function],
        'window-all-closed': [Array],
        'browser-window-created': [Function],
        activate: [Function] },
     _eventsCount: 11,
     _maxListeners: undefined,
     setApplicationMenu: [Function: setApplicationMenu],
     getApplicationMenu: [Function: getApplicationMenu],
     commandLine: 
      { appendSwitch: [Function: appendSwitch],
        appendArgument: [Function: appendArgument] },
     launcher: 
      { setBadgeCount: undefined,
        getBadgeCount: undefined,
        isCounterBadgeAvailable: undefined,
        isUnityRunning: undefined },
     allowNTLMCredentialsForAllDomains: [Function] } }
```
* another useful event is *before-quit* which gets fired when we ask to quit the app but before the app quits. we can use it to do cleanapp tasks or persist status
* we test it bu adding a listener to do a simple log
```
app.on("before-quit", function(e){
  console.log("App is abou to quit");
})
```
by using the passes events preventDefault() method i can prevent the quit in the listener. this hold only for normal quit(ctr+q) for ctr+c in terminal or alt+f4 or x in windows commands this does not hold
* many events in API are mac specific while others are cross platform.
* we will test the *browser-window-blur* and "browser-window-focus" events by adding dummy listenters.

```
app.on("browser-window-blur", function(e){
  console.log("window out of focus");
})

app.on("browser-window-focus", function(e){
  console.log("window in focus");
})
```
* we test them by clicking in the app and out of the app. we see the logs toggle. so it works
electron.app provides methods to invoke UI events or app lifecycle events on demand (e.g app.quit())
* `app.getPath(name)` allows us to get file ssytem paths for default directories
* `app.setBadgeCount()` works on linux or mac it is used to show ntifications on app icon. in app icon it has a number 

### Lecture 10 - BrowserWindow Getting Started

* [BrowserWindow documentation](http://electron.atom.io/docs/api/browser-window/)
* BrowserWindow is the core of any electron app. it is where the native app becomes web-based
* its important to make our app look and feel like a native app
* once our app is ready we create the BrowserWindow instance by calling `new BrowserWindow({width: 800, height: 600})`
* after instanciating we usually call loadURL('') to load a local html file usually index.html. we can load aremote url instead like google.com. or we can pass a url.format() method to explicitly define what we are passing with a config object.
* in the documentation of BrowserWindow we can learn how to show a window gracefully. this refers to the wait period between when app launches till the actual content loads in. this transition and wait time is called flicker
* a technique is to set `show: false` in the window instantiation config object after height. so window is not shown at creation. then we use  an BrowserWindow ready-to-show even handler to show the window when content is reeady. we use oncce instead of on as we want to listen to the event only once.

```
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })
```

* the improvent is more dramatic if we load remote content
* if we dont want to wait till we see the app after we launch it we can set the backgorund color at window instantiation call config object to match the background color of the html we are loading (remove flicker)

### Lecture 11 - Browser Window - Parent & Child Windows

* [Parent & Child Window Documentation](https://electronjs.org/docs/api/browser-window#parent-and-child-windows)
* we look into parent and child relationships between multiple windows
* we can create multiple browser windows  in a single app and they will behave independent from each other
* we  test it by adding a childWindow var and cping the mainWIndow  code for childWindow in the app.on('ready') event handler callback.
* i laucnh the app , both windows are indepentend and have their own lifecycle,. wehen both close the app quits.
* i can set mainwindow as childwindows parent by `  childWindow = new BrowserWindow({width: 800, height: 400, parent: mainWWindow})` the result is that if i close mainwindow app quits even if childwindow is open
* we can make childWindow a modal window by setting `modal: true` in cofig object. modal window is a dummy window overlaying the main window. modal window behaviour is platform specific. in MAC it behaves like dropdown. so if combined with the reeady-to-show event technique for remote content as we saw before we make an nice droppdown effect

### Lecture 12 - BrowserWindow: FrameLess Window

* [FramelessWindow Doc](https://electronjs.org/docs/api/frameless-window)
* a frameles window is a browser window without any of the os interface components like a toolbar. we makeour mainwindow a frameless one to see how it looks
* the way to define it is `  mainWindow = new BrowserWindow({width: 1200, height: 600, fram: false})`
* we get a no toolbar clean window(like apples quick time player)
* we can resize it but not drag it, devtools are still invoked with shift+ctrl+i
* to be able to drag the window we need to define dragable areas in our html content
* we use css for that using webkit `-webkit-app-region: drag;` in the example below we make the same tag (body) elements non-selectable

```
      body {
        height: 100%;
        background-color: red;
        -webkit-user-select: none;
        -webkit-app-region: drag;
      }
```

* we add a droplist in HTML (select element) and we dont want it dragable so we se it in CSS to  -webkit-app-region: no-drag; this make it a normal form element again
* when we hover over text we get the selection cursor. i fix this with a * css selector {cursor: default}. 
* much of this behaviour is platform dependent so we need to test on all platforms

### Lecture 13 - BrowserWIndow: Properties,Evenets & Methods

* [BrowseWindow class doc](https://electronjs.org/docs/api/browser-window#class-browserwindow)
* [Instance events doc](https://electronjs.org/docs/api/browser-window#instance-events)
* [Static Methods](https://electronjs.org/docs/api/browser-window#static-methods)
* in the link provided on BrowserWindow class we can see a list of options that can be passed in its constructor
* we can set fonts as a window option and not in css. to use these fonts (system fonts) in css we have to set `font: caption`
* we have instance events like focus. these events refer to the window and not in the app. in that way if i have 2 windows in my app there will be distinct focus events for each window. if i use apps *browser-window-focus* it gets fired whichever window i focus on
* useful window events are "unresponsive" and "responsive" determined from when  the web page becomes unresponsive and responsive. if page is unresponsive the main process running on node (app) is still responsive most likely
* static methods are utility methods we can use to identify browser window instances. these are like class methods in ES6 working on tehe class not the instance. e.g `BrowserWindow.getAllWindows()` we get the intances objects back. 
* we can get the window object by id with `BrowserWindow.fromId(id)` or get the window currently focused. we can get the id by eg `mainWindow.id`
* we have the instance methods that belong to a browserindow instance object e.g `mainWindow` with them we can get browser params like if its focused or if its a modal etc. an interesting is `win.setAlwaysOnTop()` which keeps the broser window on top, reload() to refresh window conttents .getParentWindow() or getChildWindow()

### Lecture 14 - Browser Window: Managing Window State

* [npm electron-window-state module](https://www.npmjs.com/package/electron-window-state)
* by default electron does not persist state from closing to opening
* electron-window-state solves the problem of data persistence
* we install the package `npm i --save electron-window-state`
*  we import the package in main.js `const windowStateKeeper = require('electron-window-state');`
* we define a window state variable passing default values in the config object (see doc)

```
let winState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 600
  });
```
* in window instance construct we set params from winstate `  mainWindow = new BrowserWindow({width: winState.width, height: winState.height, x: winState.x, y: winState.y})`
* in the ready listener we pass window instance to the state so that values to be retrieved (see constructor) will be saved prior to exit for persistence

```
  winState.manage(mainWindow);
```

### Lecture 15 - BrowserWindow: webContents

* [Bunny Video](https://peach.blender.org/download/)
* [webContents doc](https://electronjs.org/docs/api/web-contents)
* [basic Auth wiki](https://en.wikipedia.org/wiki/Basic_access_authentication)
* [basic Auth tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-apache-on-ubuntu-14-04)
* BrowserWindow.webContents allows more direct control over the content being loaded. 
* BrowserWindow is where the content gets loaded and webContents is the content itself
* we access it on an instance of BrowserWindow (e.g mainWindow). we define a new var `mainContents = mainWindow.webContents` and logit

```
WebContents {
  webContents: [Circular],
  history: [],
  currentIndex: -1,
  pendingIndex: -1,
  inPageIndex: -1,
  _events: 
   { 'navigation-entry-commited': [Function],
     'ipc-message': [Function],
     'ipc-message-sync': [Function],
     'pepper-context-menu': [Function],
     'devtools-reload-page': [Function],
     'will-navigate': [Function],
     'did-navigate': [Function],
     destroyed: { [Function: bound onceWrapper] listener: [Function] },
     'devtools-opened': [Function],
     '-new-window': [Function],
     '-web-contents-created': [Function],
     '-add-new-contents': [Function],
     move: [Function],
     activate: [Function],
     'page-title-updated': [Function],
     'load-url': { [Function: bound onceWrapper] listener: [Function] } },
  _eventsCount: 16,
  _maxListeners: 0,
  browserWindowOptions: { width: 296, height: 207, x: 2736, y: 486 } }

```

* it has an extensive API and is a node event emitter.
* it has static methods(class methods) used to get info on the instances, or access them by id (like the BrowserWindow static methods)
* instance events are used to build listeners. e.g listen for the state of the content we load in e.g *did-finish-load*, other events include *did-fail-load* *did-start-loading* *did-stop-loading*
* there are events related to redirects, user input
* we test the *new-window* event. we add an anchor link in html setting target="_blank" to open a new tab for the link. new tab in electron means new window so we trigger the event. url is passed as argument to the callback. we see the log on terminal

```
  mainContents.on("new-window", (e,url)=> {
    console.log("New Window Created for: "+url);
  });
```

* we can set the new-window to be a modal window (dropdown is working only on mac)

```
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
```

* we can implement listenters for *will-navigate* and *did-navigate* to capture navigate events in browser. eg navigate through local files
* there are also login events. this allows the app to access password protected content
* to demo basic auth tutor creates a subdomain on his localhost and add basic auth. he navigates to it in his browser and gets a modal to enter credentialso access the content
* he then adds a link to the secured content from the electron app index.html. when navigating there we get an unauthorized message
* he uses the *login* event listenter to pass user credential to acess secure content

```
  mainContents.on("login",(e,req,authInfo,callback)=>{
    e.preventDefault();
    callback("admin","nosecret")
  });
```

* media events are useful to capture media play events int eh browser. we add a video content to our html

```
    <video width="400" controls>
      <source src="mov_bbb.mp4" type="video/mp4">
    </video>
```

* and capture the media play event with a listener

```
  mainContents.on("media-started-playing",()=>{
    console.log("Video Started");
  });
```

* we can control and capture any aspect of our browser app fromt he main process
* other events are *cursor-changes* and *context-menu* (right click) that we can use to get info or capture text or user actions. in the listenr below we capute content type and position of right click event . and if text is selected and then right clicked we can capture the text in the event and the copy text ability. we can then manage text edit actions


```
  mainContents.on("context-menu", (e,params) => {
    // console.log("Context menu opened on: ", + params.mediaType + " at (x,y):"+ params.x+","+params.y);
    console.log("User selecteed text: "+params.selectionText);
    console.log("Selection can be copied: "+params.editFlags.canCopy);
  });
```

* we can control navigation file downloads and many more.load javascripts (e.g for remote content when we dont have access to javascript loader

### Lecture 16 - Session: Getting Started

* [Destructuring Assignemtn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)
* [session documentation](https://electronjs.org/docs/api/session)
*