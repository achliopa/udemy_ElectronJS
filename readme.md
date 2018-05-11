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
* the electron session module is what is used to manage state in our app (it is a part of the Main PRocess API). managing cookies, local files, webSQL, downloads and proxy settings
* we will learn how to create multiple sessions in memory and persist it. and how to attach these sessions to individual browser windows
* by default electron creates a default session for us and the session is persisted across app restarts. 
* the default session gets attached to any new browserwindow instance we create
* we can access the session in 2 ways
  * a. through `mainWindow.webContents.session`
* we instantiate and log the session instance. we get an empty object

```
  let mainSession = mainWindow.webContents.session; 
console.log(mainSession);
```

* we go to devtools ->Application-> local storage->file and add a key value pair. we restart the app and access devtools. the key-calue is still there. so it persists
* if our session was an in-memory session it would have completely reset itself
* to understand the nature of default session we create a second browserwindow instance and create a session instance for it. we use `Object.is(mainSession,altSession)` to see if both windows session objects are the same. we launch the app and see that thjey are actually the same

```
  let mainSession = mainWindow.webContents.session; 
  let altSession = altWindow.webContents.session; 
  console.log();
```

* also we see in dev tools that both have the same localstorage key value pair
* so all browserwindoes share the same default session unless specified otherwose. 
* there is a second way to acess the session as a separate module. we import it `const session = electron.session`
* we instantiate it `  let defaultSession = session.defaultSession;` and compare it to the other two session objects. they are the same
* apart fromt he defaultsession we can create our own session `let appSession = session.fromPartition('partition1')`. we load it from an other partition (location). if we compare it with the defaultSession we see that it is different. we can attach our custom session to a window so that it does not use the default session. we pass it as a param at window creation `  altWindow = new BrowserWindow({width: 700,height: 600, webPreferences: {session: appSession}}`
* we see that altSession equals our custom appSession
* if we store a key value pair at local memory of altWindow it is not persistent. this is becouse our custom session is in-memory. to makei t persistent we have to prefix the partition name with *persist:* ``let appSession = session.fromPartition('persist:partition1')``
* electron allows us to attach a suctom session to a window without creating it first. we delete the session declaration and instead of passing sessionin window instace params at cr4eation we pass the partition `altWindow = new BrowserWindow({width: 700,height: 600, webPreferences: {partition: "persist:partition1"}} );`. we see that local storage data are there. so what identifies the session is its partition
* to clear data from a session we use `mainSession.clearSotrageData()`. we restare and data are gone

### Lecture 17 - Session: Cookies

* [cookies documentation](https://electronjs.org/docs/api/cookies)
* a familiar and easy way to store data in our app are cookies.
* electron adheres to cookies spec and allows us to use cookies as a data store unlike the typical web usage. its good to store small data like app state or user data on unique sessions.
* we can access the cookies class on the session module `mainSession.cookies` using the .get() method where we can apply filters, empty object means get all, also we pass a callback that will fire once the cookies are read

```
  mainSession.cookies.get({}, (err,cookies)=>{
    console.log(cookies);
  });
```
* we see that cookies is an array, we will access some external content that stores and load cookies to see them in action. we load github log in and then quit. when we restart we see the cookie array has an object with the login data for github
* we can create our own cookies with cookies.set({url: 'https://myapp.com', name: 'cookie1',value: 'cookie_value', domain: 'myapp.com'}, (eer)=>{}) passing an object with the default cookie params(good for filtering) and a callback
* our nerwly created cokie has no expiration date and therefore is a session cookie. to persist it we have to add an expirationdate param to it
* we can filter cookies on retrieval by e.g setting name: value in get method object

### Lecture 18 - Session:DownloadItem

* [DownloadITem doc](https://electronjs.org/docs/api/download-item)
* in previous lecture we saw the dowload event. nowwe will see how to use this event and the associated DowloadItem class * a download event is an event we listen for on a electron session to intercept  a file download initiated from within the webCOntents
* this event provides to the listenter callback func an instance f the downloadItem class
* we add a downloadlink to our index.html. the default electron behaviour when we click is to pop up a propt window to select the downloaf destination
* what we want is to set a preset destination and show a download progress bar in our app
* to do that we add an event listener. this is an event of the session object. it returns the downloadItem,event ad webCOntent from where download was initiated. we use the will-donload to print the filnaem of the file we intend to download

```
  mainSession.on("will-download", (e,downloadItem,webContent)=> {
    console.log(downloadItem.getFilename);
  })
```

* we will now set a predefined download location. this is easy. we save the filename and se the path passing a relative or absolute path + filename. all this in the callback we saw before

```
let file = console.log(downloadItem.getFilename);
    downloadItem.setSavePath('downloads/'+file);
```

* we want to print the status and progress of the download. we need the total filesize so as to calculate the percentage. then we use the dowloadItem update event which fires whenever status is updates to  get the bytes and calc the %. we log the progress only when download is in progressing state

```
  mainSession.on("will-download", (e,downloadItem,webContent)=> {
    let file = console.log(downloadItem.getFilename);
    downloadItem.setSavePath('downloads/'+file);

    let size = downloadItem.getTotalBytes();

    downloadItem.on("updated",(e, state)=>{
      let progress = Math.round((downloadItem.getReceivedBytes() / size) * 100);

      if (state === 'preogressing'){
        console.log(progress+'%')
      }
    });
  });
```

* we can improve the log to be logged in same line with 

```
      if (state === 'preogressing'){
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write('Dowloaded: '+progress+'%')
      }
```

* we can also listen to the *done* event (state === "completed") to print a finished message. this is an one time event so we use once
* in a real app these data will pass to the HTML content

### Lecture 19 - Dialog

* [Dialog doc](https://electronjs.org/docs/api/dialog)
* in thos lecture we will learn how to create native dialogs with the Main process (electron app) dialog module
* a dialog is a system prompt to select a file location , ask for an answer etc
* we import the module `const dialog = electron.dialog`
* we write a function to trigger a dialog winodw setting the initial path and a button name. we also pach a callback to print the file we select on console. we use the dialog.showOpenDialog() method

```
function showDialog(){
  dialog.showOpenDialog({defaultPath: "C:\\Users\\a.chliopanos\\workspace", buttonLabel: 'Select Logo'}, (openPath)=>{
    console.log(openPath);
  });
}
```

* we pass it to a setTimeout method in our main proigram and see it fire. when we select a file we see it on console  `[ 'C:\\Users\\a.chliopanos\\workspace\\bitmap.png' ]`
* to fine tune the dialog we add a properties param adding the ability to open the file we select, allow multiselection to select multiple files and add the ability to create anew dir `properties: ['openFile', 'multiSelections','createDirectory']`
* the way to open a save dialog is similar but in the callback we get the filame that will be saved

```
  dialog.showSaveDialog({defaultpath: "C:\\Users\\a.chliopanos"},(filename)=> {
    console.log(filename)
  });
```

* .showMessageDialog shows a dialog mesage to listen to buttons

```
function showDialog(){
  let buttons =['Yes','No','Maybe']
  dialog.showMessageBox({buttons, title: 'Electron Message DIalog', message: 'Please Select an answer', detail: 'A more descriptive message' }, (buttonIndex)=>{
    console.log("user selected: "+buttons[buttonIndex]);
  });
}
```

### Lecture 20 - Accelerator & globalShortcut

* [Accelerator doc](https://electronjs.org/docs/api/accelerator)
* [globalShortcut doc](https://electronjs.org/docs/api/global-shortcut)
* key shortcuts are useful in desktop apps. we will learn how to register global shortcuts our app can listen for
* an accelerator is a string representation of a keyboard shortcut
* docs provide a broad list of key codes and modifiers
* there are also key like events like VolumeUp, MEdiaNextTrack etc
* we will see how to register the accelarators. first we import the module `const globalShortcut = electron.globalShortcut;`
* to register the accelarator we use the register() method passing the string representation and a callback. we add the code in our main funct

```
  globalShortcut.register('g', () => {
    console.log('User pressed g');
  });
```

* this is a global shortcut, so event fires even if the app is not in focus
* electron provides combination keys to make the app cross platform (some keys are different across os)
* we can programmaticaly register or unregister shortcuts with .unregister('string key shortcut') `globalShortcut.unregister('g');`

### Lecture 21 - Menu & Menuitem

* [Menu docs](https://electronjs.org/docs/api/menu)
* [MenuItem class](https://electronjs.org/docs/api/menu-item)
* electrons menu class allows us to create native menus to use as app main menu or as context menu
* a menu isntance gets populated with menu items for which we use the MenuItem class
* we start with importing both classes

```
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
```

* we create a menu instace `let mainMenu = new Menu();`. we will now fill it with menu items. there are platform differences bewtween platforms noted in the docs
```
let menuItem1 = new MenuItem({
  label: 'Electron',
});
```
* we add items to menu with .append() `mainMenu.append(menuItem1);`
* we set our custom menu as app menu with ` Menu.setApplicationMenu(mainMenu)`
* we add submenus by nesting tehm inside
```
let menuItem1 = new MenuItem({
  label: 'Electron',
  submenu: [
      {label: 'Item 1'},
      {label: 'Item 2'}
  ]
});
```
* we can instantiate a whole menu + menuItems with the Menu.buildFromTemplate() static method passing the config object we passed in MenuItem constructor or an array for many top level items. 
* we can export the config object templates from a file to make code modular
* to add functionality to the meny we can use the click option to pass a callback function
* we can add key shortcuts to the meny items using accelerators
* we can disable a menuitem with enabled property
```
            {
              label: 'Greet',
              click: ()=> {console.log("hello")}
              accelerator: 'Shift+g',
              enabled: false
            }
```
* there is another way to add functionality to a menu item by assigning a role. the role add built in or platform specific functionality to the app (undo,redo,copy, paste) the roles might change depending on content

```
      {
        label: 'Toggle Developer Tools',
        role: 'toggledevtools'
      }
```

* a role can add its own label so we can set only the role withou label `role: 'togglefullscreen`

### Lecture 22 - Menu: Context Menu

* [Popup menu](https://electronjs.org/docs/api/menu#menupopupbrowserwindow-x-y-positioningitem)
* [Context menu event](https://electronjs.org/docs/api/web-contents#event-context-menu)
* we can capture right click events by webContent *context-menu* event
* we create anew menu instance with some menu items
```
let contextMenu = new Menu.buildFromTemplate([
  {role: 'copy'},
  {role: 'paste'},
  {type: 'separator'},
  {role: 'undo'},
  {role: 'redo'}
]);
```
* we trigger it using the context-menu event with a popup() method

```
  mainWindow.webContents.on("context-menu", (e) => {
    e.preventDefault();
    contextMenu.popup();
  });

```

### Lecture 23 - Tray

* [Tray class doc](https://electronjs.org/docs/api/tray)
* [nativeImage](https://electronjs.org/docs/api/native-image)
* tray class extends our apps to use the OS application tray
* there are 2 ways to interact with an app in the tray
    * attach a menu to it.
    * listen for uisers input in the tray icon
* we import Tray `const Tray = electron.Tray;` create a tray instance passing a native image
* we add a tootip with setToolTip() method
* we can pass a menu to it with setContextMenu() passing a manu instance
* the alternative to menu item is listen for event on th tray using the events offered. eg toggle visibility with click
```
let tray;

function createTray(){
  tray = new Tray('food.png');
  tray.setToolTip('Electron App');
  tray.setContextMenu(contextMenu)
  tray.on("click",()=>{
     mainWindow.isVisible()? mainWindow.hide():mainWindow.show();
    })
}
```

* and call the function in our app ready callback. we start and see the icon in the tray

### Lecture 24 - Power Monitor

* [PowerMonitor Doc](https://electronjs.org/docs/api/power-monitor)
* powerMonitor module is simple and allows us to control the apps state depending on the os power status state (suspend,resume, on-ac, on batt)
* we cannot even include this module before app is ready so all code must be in the ready listener.
```
  electron.powerMonitor.on('suspend',()=> {
      console.log('system going to sleep')
  });
    cr
```

## Section - IPC Communication

### Lecture 25 - ipcMain & ipcRenderer

* [ipcMain doc](https://electronjs.org/docs/api/ipc-main)
* [ipcRenderer doc](https://electronjs.org/docs/api/ipc-renderer)
* ipc = inter-process communication
* it is used fo rmain process communication with renderer process. we use ipcMain module and ipcRenderer module. both are simple modules with few helper methods and event to listen to the ipc message channel, and send method to send a message to the channel
* to use it in main.js we import  `const ipcMain = electron.ipcMain;` and in renderer.js we import `const { ipcRenderer} = require('electron');`. these are 2 implementation of the same functionality. 
* we make asynchronous message transmissions to the specified channel with `ipcRenderer.send("channel1", "Hello from the renderer process")` for renderer => main message on channel1
* we listen for messages on a channel with an event handler on speciufied channel, in our callback args is the actual data received

```
ipcMain.on("channel1",(e,args)=> {
  console.log(args);
});
```

* ipc comm is by default asynchronous and unidirectional . if want a send confirmation making the comm bidirectioinal our code is changed as follows

```
// @renderer.js
ipcRenderer.send("channel1", "Hello from the renderer process")
ipcRenderer.on("channel1", (e,args)=> {
  console.log(args);
})

// @ main.js
ipcMain.on("channel1",(e,args)=> {
  console.log(args);
  e.sender.send('channel1','Message Received on the main process')
});
```

* not e that main in the callback sends a message to the sender. thi is because channels might be shared by >2 processes so he has to define he wants the mnessage to be directed to the sendter of the message he is listening to. renderer is logging in devTools
* processes can use multiple channels, the methods are the same
* to initiate comm from main to renderer the implementation is a little different. we need to identify to which renderer we send the message. to do this we use the BrowserWindow.webContents.on('did-finish-load',()=>{}) callback to palce the send message method `mainWindow.webContents.send()` so that it is directed to the respective window. the comms functions are the same. we have to define a channel as well
* electron allows us to send synchronous messages as well so that process will block until it receives a responce(non-recommended). in our example renderer send a sync message using the .sendSync() method. it freezes untill main replies with an  event.returnValue. to make it obvious we set a timeout of 3secs

```
// @  main
ipcMain.on('sync-channel',(e,arg)=>{
  console.log('Sync message received')
  setTimeout(()=>{
    e.returnValue = 'A synchronous response from the main process';
  },3000);
});
// @ renderer
let mainResponse = ipcRenderer.sendSync('sync-channel', 'some request')
```

* we can send any form of data throught he channel (JSON,obkects). we can make it a powerful tools eg. passign a close param to kill the provess 

```
if(args.close) process.exit();
```

## Section 5 - Renderer Process API

### Lecture 26 - Remote

* [Remote Doc](https://electronjs.org/docs/api/remote)
* [Node global module](https://nodejs.org/api/globals.html#globals_global)
* remote module of the renderer API is a wrapper of the ipc to enable us to acces data on the main process without the need of using ipc
* we import it to renderer.js `const remote = require('electron').remote;`
* wif we consolelog the remote object we see all its content in devTools. it is made almost all of getter methods returning a reference to the object in the main process, arrays and buffers are not referenced rather than copied over. if we modify them in renderer changes wont pass to main
* to demo its power we will access the dialog module from remote with `var dialog = require('electron').remote.dialog;`
* we can then use it exactly lik ein main `dialog.showMessageBox({message: 'A message dialog invoked via renderer.js', buttons: ['OK']});`
* we see that the invokation happend before content finish rendering on screen. this is because of the way the remote module communicate with the main process by a synchronous IPC message. main process is waiting for the messagebox callback to fire, before setting the return value and setting it back. 
* this is rarely the case as it is unlikely to promp a message before rendering content
* the dialog box is actually created in the main process
* references to the main process wil prevent them from being collected by garbage collecctor in main process
* So ONCE WE ARE DONE WITH A LISTENER TO THE REMOTE OBJECT UNREGISTER
* we can reference BroswerWindow with remote to create windows from renderer

```
const BrowserWindow = require('electron').remote.BrowserWindow;
let win = new BrowserWindow({width: 400, height: 200});
win.loadURL('https://google.com');
```

* an other neat feat of remote is the access to node.js global module (global array available across the node process). 
* it is useful as renderer is not part of the node main process 
* we create aglobal propery in main.js `global['app_version'] = 1.1;` and access it in renderer with `remote.getGLobal('app_version');`
* remote module is useful when dealing with user interaction. e.g quit the app from the renderer 

```
const {app,dialog} = require('electron').remote;
dialog.showMessageBox({message: `Are you sure you want to quit?`, buttons: ['Quit','Cancel']}, (buttonIndex)=> {
    if(buttonIndex === 0) app.quit();
  });
```

* this time  app is not frozen because we pass a callback (to act as return value)

### Lecture 27 - BrowserWindowProxy

* [BrowserWindowProxy docs]https://electronjs.org/docs/api/browser-window-proxy)
* [MDN window.open() doc](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Position_and_size_features)
* [MDN Window doc](https://developer.mozilla.org/en-US/docs/Web/API/Window)
* [MDN Document doc](https://developer.mozilla.org/en-US/docs/Web/API/Document)
* BrowserWindowProxy object is an instance of electrons browser window that gets returned from native window.open() method
* in index.html opened in the mainWidow(opened in main.js) we add a link to google with target blank (open in new tab).
* when I click the link electron creates a new window with all default options
* we have no way to manage this window in renderer
* we add in the href anchor tag (index.html) the `onlick="open_win()"` vanilaJS code to open a new window for the link `<h3><a onclick="open_win()" >Google</a></h3>`
* we get an error that open_win is not implemented. so we implement it inline in index.html
```
      const open_win = () => {
        window.open('https://google.com')
      }
```
* we can use this method to open/close a window from index.html

```    
<style type="text/css" media="screen">
      * {
        cursor: pointer;
      }
</style>
      <h3><a onclick="open_win()" >Open Google</a></h3>
    <h3><a onclick="close_win()" >Close Google</a></h3>
    <script>

      let win; 
      const open_win = () => {
        win = window.open('https://google.com')
      }
      const close_win = () => {
        win.close();
        console.log('close window')
      }
    </script>
```
* to create an alert in this window we use win.eval() with executes passed js code
```
<h3><a onclick="alert_win("MEsage")" >Close Google</a></h3>
const alert_win = (msg)=> {
  win.eval(`alert('${msg}')`)
}
```

* onclick inline is messy. we can add id tag to the anchor tag and in JS script use vanillaJS with 

```
document.getElementById('google_link').setEventListener('click', ()=>{
  //logic
  })
```
* now we will learn how to pass custom features to new window. window takes 3 arguments: URL, frame name(overwriten by loaded html title) , and frame features passed as string e.g. `win = window.open('https://google.com','Google Window', 'resizabler=no, width=950')`

### Lecture 28 - WebFrame

* [webFrame doc](https://electronjs.org/docs/api/web-frame)
* whenever we deal with a browser window it will contain webContents. web contents is rendered to the webFrame. 
* webFrame dictates aspects of webContents rendering (e.g zoomLevel)
*  in our index.html we add an img tag 
```
<body>
  <img src="http://placehold.it/200x150" alt=""/>
  <hr>
  <button id="zoom_in">Increase Zoon</button>
  <button id="zoom_out">Decrease Zoon</button>
  <button id="zoom_reset">Reset Zoon</button>
</body>
<script>
  const {webFrame} = require('electron');

  let zoom = 0
  document.getElementById('zoom_up').addEventListener('click,()=>{
    webFrame.seZoomLevel(++zoom);
  });
  document.getElementById('zoom_down').addEventListener('click,()=>{
    webFrame.seZoomLevel(--zoom);
  });
  document.getElementById('zoom_reset').addEventListener('click,()=>{
    webFrame.seZoomLevel(0);
  });
</script>
```

* this framework allows us to inject custom JS in the webframe
```
  <textArea id="code" name="name" rows="10" cols="50"></textArea>
  <button id="run_js">Run JS</button>
<script>
  document.getElementById('run_js').addEventListener('click,()=>{
    let code = document..getElementById('code').value;
    webFrame.executeJavaScript(code);
  });
</script>
```

* we can get info on all resources loaded in the webFrame with `webFrame.getResourceUsage()`

### Lecture 29 - Webview Tag

* [Webview Tag doc](https://electronjs.org/docs/api/webview-tag)
* [DOM Element Ref](https://www.tjvantoll.com/2012/07/19/dom-element-references-as-global-variables/)
* [DOM element ids are gobals](http://2ality.com/2012/08/ids-are-global.html)
* webVew is an html tag <webview> that gives us absolute control over the content loaded in it and behaves like a elecctron browser window
* a webview tag runs in its own process, electron app is protected by the webview content
* brwser window exposed node API so this separation is important
* we add a webview tag in index.html `<webview id="webview1" src="page1.html"></webview>`
* we add aboilerplate pag1.html which renders as an embedded window like an iframe. we can style the webview, or add properties to the tag (see doc)
* where webview gets unconventional is when we refrence it as dom element in the parent page `const webview = document.getElementById('webview1');`. we can start listening for event from it. important event are *did-start-loading* and *did-stop-loading* as we need to load first before performing actions in it. 
* we can insert CSS with .insertCSS()
* we can pass text from another elemenbt in the webview element
* chromium adds elements to the  window object by their id attribute or their name attribute, when we give an elelment an id this is available globally as window.idname so i can skip document.getElementById('') accessing idname.addEventListener. this is no recommended
* we can implement thow our custom embedded browsing window

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <style media="screen">
      webview {
        height: 500px;
        border: 1px solid grey;
      }
      input, button {
        font-size: 2rem;
      }
    </style>
  </head>
  <body>
    <webview id="webview1" src="page1.html"></webview>
    <hr>
    <input id="url" type="text" placeholder="URL to load">
    <button id="load">Load</button>
    <h4 id="currentPage"></h4>
    <script>
      const webview = document.getElementById('webview1');
      const url = document.getElementById('url').value;
      const currentPage = document.getElementById('currentPage');
      load.addEventListener('click',()=>{
        webview.loadURL(url);
        url = '';
      });
      
      webview.addEventListener('did-navigate',(e)=>{
        currentPage.innerHTML = e.url;
      });
    </script>
  </body>
</html>
```

## Section 6 - Shared API

### Lecture 30 - Process

* [Process docs](https://electronjs.org/docs/api/process)
* [Node Process docs](https://nodejs.org/api/process.html)
* the shared api is shared between renderer and main but they exist excusively. this is unlike the remote module that uses ipc to make main available in renderer
* Process is shared object and exist for any node process beign renderer or main
* electron adds some of it properties and methods to this object
* we can access the object in main or renderer directly without requiring it. it offers various proerties like type, versions.electron, .chromium .resourcesPath
* main process type is browser and renderers is renderer. we can check if the process is an Mac App store build or a win store app
* we can simulate a crash and hang of the process with process.hang() and process.crash(). we could auto recover from an error with mainWindow.reload(). we can also get memoryInfo for our app

### Lecture 31 - Screen

* [Screen doc](https://electronjs.org/docs/api/screen)
* a small but useful module. allows to get info aboutr user screen sizes and layout. like external monitors (HANDY)
* we have to understand how screen layouts work
* in renderer we import screen from electron `const screen = require('electron').screen`
* we log the `screen.getAllDisplays()`. we get an object per display device but the object has getters and setter methods as the properties might change at any given time
* to get the screen width of primaryt display i call `displays[0].size.width` using getters but the syntax is like proerties
* in multidisplay it is useful to get the bounds. the top-left boundary pixel of the screen in a unified grid. we use .bouds.x and bounds.y for this
* the primary display starts at 0,0 always. the second display depending on our configuration always in relation to the primary screen starting point. e.,g -1440,100
* we get a perfect layout also events for displays added or removed or even when metrics change. we change our screen direction 90deg and -90deg and log the chandeMetrics object

```
screen.on('display-metrics-changed',(e,display,changeMetrics) => {
  console.log(display)
  console.log(changedMetrics)
  });
```

* changed metrics says what changed so we can reconfigure our apps screen based on the configuration.
* we can set oncCLick event listener to <body> and using screen.getCursorScreenPoint() capture the x,uy coords in the grid
  * in main process we can use screen.getPrimaryDisplay() pass its size.width and height to the BrowserWindow constructor and launch a full screen borswer

### Lecture 32 - Shell

* [Shell doc](https://electronjs.org/docs/api/shell)
* [MDN datatransfer doc](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)
* we use shell moduleto open external resources
```
      const {shell} = require('electron');
      shell.openExternal('https://google.com');
```
* we use html5 file features to work with files dragged and drop on html elements
* our dropzone is a div element
```
    <div id="filebox">
      <h3>Drop File Here</h3>
    </div>
```
* we style it
```
      #filebox {
        border: 5px dashed black;
        padding: 3rem 4rem;
        float: left;
      }
```
* we write the code to handle file droped of on the element and log it. in deTools we see the path etc
```
      filebox.ondrop = (e) => {
        console.log(e.dataTransfer.files);
        return false;
      }
```

* we log the filepath
```
      filebox.ondrop = (e) => {
        myfile = e.dataTransfer.files[0].path
        console.log(myfile);
        return false;
      }
```
* we implement an index.html to create an open an delete file box. which uses shell module to call system methods for operating on the files

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <style type="text/css" media="screen">
      .box {
        border: 5px dashed black;
        padding: 3rem 4rem;
        float: left;
        color: white;
      }
      #filebox {
        background: green;
      }
    </style>
  </head>
  <body>
    <div class="box" id="filebox">
      <h3>Open File</h3>
    </div>
        <div class="box" id="trashbox">
      <h3>Open File</h3>
    </div>
    <script>
      const {shell} = require('electron');
      const filebox = document.getElementById('filebox');
      const filebox = document.getElementById('trashsbox');

      trashsbox.ondragover = trashsbox.ondragend = trashsbox.ondragleave =
      filebox.ondragover = filebox.ondragend = filebox.ondragleave = ()=> {
        return false;
      }

      filebox.ondrop = (e) => {
        myfile = e.dataTransfer.files[0].path
        shell.openItem(myfile)
        return false;
      }
      trashbox.ondrop = (e) => {
        myfile = e.dataTransfer.files[0].path
        shell.moveItemToTrash(myfile)
        return false;
      }
    </script>
  </body>
</html>
```

### Lecture 33 - NativeImage

* [nativeImage docs](https://electronjs.org/docs/api/native-image)
* [MDN dataURIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
*[dataURIscheme wiki](https://en.wikipedia.org/wiki/Data_URI_scheme)
* we ve used nativeImage to pass a png image to the tray module
* we import the module from electron. there are a lot of methods to create a native image from various sources
* node exposes all its fs to the renderer process. so fs module can be called
* native image is raw. to give it a filetype we need to save it to a format
* DataURL is a convenient way to store image as a URi without putting it to disk.
```
      const fs = require('fs');
      const {nativeImage} = require('electron');

      let logo = nativeImage.createFromPath('/home/achliopa/logo_lg.png');
      console.log(logo.getSize());
      fs.writeFile('/home/achliopa/logo_lggggg.jpg', logo.toJPEG(180));
      console.log(logo.toDataURL());
```
* dataURL can be passes as source to image tags in html

## Section 7 - Features & Techniques

### Lecture 34 - Clipboard

* [Clipboard Documentation](https://electronjs.org/docs/api/clipboard)
* clipboard module allows us to copyu/paste eleements to other apps
* we import it from electron `const {clipboard} = require('electron');`
* we copy a piece of text from an external app to the clipboard.
* we can use `clipboard.readText([type])` to pass it to the app
* we can write to clipboard with `clipboard.writeText('text');`
* we can copy an image from an external app and pass it to the app with `clipboard.readImage()` then we can convert it to dataURL with .toDataURL() and pass it as source the image tag in our html file

### Lecture 35 - Offscreen Rendering

* [offscreen rendering docs](https://electronjs.org/docs/tutorial/offscreen-rendering)
* this module allows us to render and interact with the electron browser window as a browser process.
* electron supports towo modes of offscreen rendering, using the gpu to render or the cpu
* unless we have to render 3d webGL(we have) or CSS animations we should stick to cpu rendering
* to use cpu for offscreen rendering we need to disable gpu accelaration.
* we start from main.js and run `app.disableHardwareAcceleration();`
* we create anew browserwindow instance
```
let bgwin;
app.on('ready', () => {
  bgwin = new BrowserWindow({
    webPreferences: {
      show: false //browser wont bee seen at all
      offscreen: true
    }
  });

  bgwin.loadURL('https://github.com');

  bgwin.webContents.on('did-finish-load',()=>{
    console.log(bgwin.getTitle());
    app.quit();
  });
});
```

* the above code sets the window to render webcontent offline in the background and print the title to console once the content is loaded (in the background)
* we can instead of finish loading even listen to the paint event which fires everytime there is an update in the render process and save screenshots of the page loading. paint event passes 3 args 
```
  fs = require('fs');
  let i = 1;
  bgwin.webContents.on('paint',(e,dirtyArea,nativeImage)=>{
      let img = nativeImage.toPNG();
      fs.writeFile(`path${i}.png`,img);
      i++;
  });
```

### Lecture 36 - Network Detection

* [online/offline event detection](https://electronjs.org/docs/tutorial/offscreen-rendering)
* [online/offline events MDN](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events)
* it applies to renderer
* this module uses native HTML5 capabilities to detect network status . we can get it with `navigator.onLine`
* we can to status change events
* 
```
window.addEventListener('online',()=>{
  
});
window.addEventListener('offline',()=>{
  
});
```
we can simulate connectivity in devTools to test that

### Lecture 37 - Battery Status

* [Battery Status API - MDN - obsolete](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)
* this is pure HTML5 but is deprecated. it gives battery status
* only applkies to laptop
* this returns a promise `window.navigator.getBattery().then((battery)=> {
  console.log(battery)
})`
* we get the BatteryManager object with all the battery related info available

## Section 8 - Project

### Lecture 38 - Project Overview

* we will build a simple bookmarking app for articles to read.
* he uses jquery, bulma css framework
* he installs css libraries using bower
* we cp the project and in the root folder run `npm install`
* we install bower locally with `npm install --save-dev bower`
* we add it to the scripts `"bower": "./node_modules/.bin/bower",`
* we install v0.3.1 of bulma with bower `npm run bower i bulma@0.3.1`
* as a dependency for bulma we isntall font awesome `npm run bower i font-awesome`
* having the dependencies ready we use the electron quickstart project like before as a base for the project
* the default project structure will change only to split main from renderer
* so we downolad starter app from electron and cp the sources (index.html,renderer.js,main.js) to our project
* we create a renderer folder and move index.html and renderer.js in it. we rename index.html as main.html (it will be rendered in the main window)
* we rename renderer.js to app.js (application startup  and ui logic)
* we add a main.css for our styling in renderer folder and call app.js in main.html sripts tag
* we instal jquery with npm `npm i --save jquery`. to import it in our project it is not like adding a js file in script. jquery is added as an object so we need to impor it in scripts before app.js as `$ = require('jquery');` to make it available in our scripts like normal syntax etc.
* we remove boilerplate from main.html
* we add stylesheet links (bulma,font-awesome,main)
* we create a new js file in root for mainWindow code (mainWindow.js)
* we cut all code refering to mainWindow from main.js leaving only global logic in main.js
* in mainWindow.js we import BrowserWindow, export win object and createWindow() function where we make an  browserwindow instance to global win var . open devtools,load url and set a close listener to dereference it
* we fix the imports in main.js
* we run the app. it works fine. also we test in console jquery with $ 
* we are now ready to add UI elements in our main.html
* we ad html tags with bulma classes to
  * an add control group w/ button to add items w/plus sign and a text input with a magnifying glass icon
  * we add alist to hold our read items again with bulma
* we are ready to add logic to the app

### Lecture 39 - Submitting new Items

* we will add a modal window (overlay) to add a new item. 
* it will have an text field to enter the url;, an add button and a cancel button
* we use bulma modal. and add the html code for modal before the body closing tag
* we add button logic in app.js to show/hide the modal

```
// Show add modal
$('.open-add-modal').click(()=>{
  $('#add-modal').addClass('is-active');
});

// Hide add modal
$('.close-add-modal').click(()=>{
  $('#add-modal').removeClass('is-active');
});
```

* when we click the add button we capture user input in the url text field

```
//handle add-modal submission
$('#add-button').click(()=>{

  // Get URL from input
  let newItemURL = $('#item-input').val();
  if(newItemURL) {
    console.log(newItemURL);
  }
});
```

* we simulate button click with enter press (we call the even from the listener)

```
//simulate add click on enter
$('#item-input').keyup((e) => {
  if(e.key === 'Enter') $('#add-button').click();
});
```
* for the bookmark we want to save the title and a thumbnail of the page. we will do it by sending the newItemURL via IPC to the main process which will trigger an offscreen browserWindow to load the newItemURL and get the data for our list item. the main  process will respond back to the app.js with ipc the new item with all the data inside
* we start by writing the send method to send url to main through ipc from inside the click event listener callback `ipcRenderer.send('new-item', newItemURL);` we open a dedicated channel 
* in main we impor ipcMain and listen to the message queue
```
ipcMain.on('new-item',(e,itemURL)=>{
  console.log(itemURL);
});

```
* we respond to this message with mockdata (to make our channel duplex) and simulate the delay of retrieveing the dsata with a timeout

```
// Listen for new read item
ipcMain.on('new-item',(e,itemURL)=>{
  setTimeout(()=>{
    e.sender.send("new-item-success","new read item");
  },2000);
});
```
* in app.js we listen to the channel and cl the data
```
// Listen for new item from main
ipcRenderer.on('new-item-success',(e, item)=> {
  console.log(item);
});
```

* we see a bug as we can resubmit the request while waiting and thus flood the channel. so we dosable the input button while waiting
```
    $('#item-input').prop('disabled',true);
    $('.close-add-button').addClass('is-disabled');
    $('#add-button').addClass('is-loading');
    // send URL to main process via IPC
    ipcRenderer.send('new-item', newItemURL);
```
* once we receive reply  we reenable all and close modal
```
  $('#add-modal').removeClass('is-active');
  $('#item-input').prop('disabled',false);
  $('.close-add-button').removeClass('is-disabled');
  $('#add-button').removeClass('is-loading');
});
```

### Lecture 40 - Retrieving Item Details

* in this lecture we foculs on the process of offscreen rendering in another BrowserWindow and get the items Title and Screenshot once loaded
* we add a new win moduule for offscreen rendering. we will create a new file readItem.js to host our code for this win and import it to main.js to use it as follows

```
ipcMain.on('new-item',(e,itemURL)=>{
  readItem(itemURL,(item)=>{
     e.sender.send("new-item-success",item);
  });
});
```
* we create aglobal var window in our new file (this prevent it from being garbage collectedc)
* we implemnt the readItem function that is exported
```
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
```
* we test it in main and SUCCESSS!

### Lecture 41 - Showing & Persisting Items

* we go back tot the rendering process to use the newly acquired item passed back by the main process and prepare them for showing in UI. 
* we can add the logic to the app.js but the idea is to add another layer that will handle this functionaily of handling  the items reserving app.js for handling the UI iteself
* we call the nee module items.js in the same renderer dir. we use it in the reply channel listener `items.addItem(item);`
* we export in items.js a addItem function which takes the item object, creates an HTML snippet and appends it to read-list id tag element
```
// add nee item
exports.addItem = (item) => {
  // hide 'no-items' message
  $('#no-items').hide();

  //create html string for new item - bulma panel block
  // we can implement some templating e.g mustache
  // we keep it simple and use ES6 interplated strings
  let itemHTML = `<a class="panel-block read-item">
            <figure class="image has-shadow is-64x64 thumb">
              <img src="${item.screenshot}">
            </figure>
            <h2 class="title is-4 column">${item.title}</h2>
          </a>`;

  //append to read-list
  $('#read-list').append(itemHTML);
};
```
* we test it and SUCCESS
* we see as we keep adding items that when the list exceeds the frame it gets scrollable and the header with the list. we want the header anchored to the top. we fixed this in main.css
```
.panel {
  padding-top: 52px;
  margin-bottom: 0 !important;
}

.panel-heading {
  position: fixed;
  width: 100%;
  margin-top: -52px;
  z-index: 100;
}
```
* we dont persist the items once the app reloads they are gone
* we need to keep track of the items. we create an array in items.js. we persist to local storage an array of items
```

// track items with array
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || [];

// save items to localstorage
exports.saveItems = ()  => {
  localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}
```
* before we show a new item we persist it in app.js message reply listener
```
// Add item to items array
  items.toreadItems.push(item);
  // save items to storage
  items.saveItems();
  // Add item
```
* we populate the list at app refresh/restart by iterating through the array 
```
// add items when app starts
if(items.toreadItems.length)
  items.toreadItems.forEach(items.addItem);
```

### Lecture 42 - Selecting Items for Opening

* we have no control over the items we create
* we want to filter the list of items by title using the input field. we implemente an event handler of keyup event to capture letter grain functionality.fa-toggle-left
* we get back the array (through class selection) iterate through it and show or hide depending on match

```
// filter items by title
$('#search').keyup((e) => {
  //get current search input value
  let filter = $(e.currentTarget).val().toLowerCase();

  $('.read-item').each((i, el) => {
    $(el).text().toLowerCase().includes(filter) ? $(el).show(): $(el).hide();
  });
});
```

* we now want to be able to select an item. bulma provides the *is-active*. if i add the class to one of the items it is styled differently
* in the add item to list when we recreate the list we add click event listener for all item (first we remove existing ones and add new). we pass in a function
* in this function we dont remove bulma is-active class from all and add it to the clicked item
* we add this selected class to the first item at app startup (why?) in the init code where we populate the list `$('.read-item:first()').addClass('is-active');`
* if our list is empty and we add the first item is not selected
* in the ipc response listener for new item we add select class to this item
```
  //if this is the first item
  if(items.toreadItems.length === 1)
    $('.read-item:first()').addClass('is-active');
```
* we want to add the ability to move and down in items using up and down key
* we add a generic key event handler in app.js and implement the callback in items.js
```
// select next/prev item
exports.changeItem = (direction) => {
  // get the active item
  let activeItem = $('.read-item.is-active');

  // check direction and get next or previous read-item
  let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item');

  // only if item found change selection
  if(newItem.length) {
    activeItem.removeClass('is-active');
    newItem.addClass('is-active');
  }
}
```
* we are now ready to implement opening the item. we add a method for opening the item (using a data attribute of the tag which we add to the injected HTML interplated literal)
```
// open item for reading
exports.openItem = () => {
  // only if items have been added
  if(!this.toreadItems.length) return

  // Open item for reading
  let targetItem = $('.read-item.is-active');

  // get item's content url
  let contentURL = targetItem.data('url');
}

```
* we call it from tthe double click even (dbclick)

### Lecture 43 - Opening Items in Reader

* we implement readability. in openItem() (item.js) we will use the captured url to pass in to a new window

```
  // Reader window URL
  let readerWinURL = `file://${__dirname}/reader.html`;

  // Open item in new proxy BrowserWindow (secure)
  let readerWin = window.open(readerWinURL, targetItem.data('title'));
```
* we use window.open() as this is HTML code not electron so we dont have to manage the window from the app. we have less control but ok
* this is a way to protect our app from remote content. we now want to load the content in the window in an embedded way. using webview tag
* webview helps isolate unknown or insecure content we add `<webvew src="about:blank"></webvew>`
* we dont leave the tag empty because in that case it would fail to load the dom . and we need dom ready event to load our content.
* in openItem we encode the URI and pass it as query in the html parse
```
// open item for reading
exports.openItem = () => {
  // only if items have been added
  if(!this.toreadItems.length) return

  // Open item for reading
  let targetItem = $('.read-item.is-active');

  // get item's content url (encoded)
  let contentURL = encodeURIComponent(targetItem.data('url'));
  
  // Reader window URL
  let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}`;

  // Open item in new proxy BrowserWindow (secure)
  let readerWin = window.open(readerWinURL, targetItem.data('title'));
}

```
* int he reader.html we use query string to extract the url from query decode it and pass it to webview
```
      //jquery
      $ = require('jquery');

      // query-string
      const queryString = require('query-string');

      // parse query string
      const queryParams = queryString.parse(location.search);
      // Get query string 'url'
      let url = decodeURIComponent(queryParams.url);

      // load remote content once webview is ready
      $('webview').one('dom-ready',(e)=>{
        //load item content url into webview
        e.currentTarget.loadURL(url);
      });
```
* we install *query-dstring* npm module to pass url query string in our html js script `npm i --save query-string`
& when the reader window loads its balnk till webview url gets loaded. we will replace it with a  spinner
* we will check for problems while loading the content

### Lecture 44 - Delete Items

* [NPM module query-string](https://www.npmjs.com/package/query-string)
* we will implement a delete button in the reader window to delete an item. also our selection will move to the next item
* we add a html button and style it. in js we will add a click listener to delete the item. but deleteitem will recide in item.js which belongs to another window so how we will communicate the item to delete between browsers? 
* we will use window.postMessage() native HTML messaging system to communicate with the browser window proxy object. thi is difficult
* we will use winodw.opener() to access the parent window the one it opened the current one. it does not allow complete access . but it allows us to access javascript in its global scope using eval (we can access methods on the parent windows global scope)
* eval is unsafw and must be avoided at all cost. but in electron we have complete control on our apps code. eval is bad for browsers
* we implement deleteItem in items.js
* we pass the item index from renderer to reader witht he uerl query using query-params to extract it. 
* we use the windo.eval method to call back the deleteItem window method on the parent
```
// Handle mark-read click (delete)
        $('#mark-read').click(()=>{
          //parent window
          window.opener.eval(`deleteItem(${itemIndex})`);
          window.close();
        })
```
* we implement the deleteItem function (delete from dom and delete from stored array)
* when we reload the app items are back as we dont persist the change. we fix that by calling saveItems
```
// window function (main.js global scope)
// delete item by index
window.deleteItem = (i) => {
  // remove item from DOM
  $('.read-item').eq(i).remove();
  // remove from toreadItem array
  this.toreadItems = this.toreadItems.filter((item,index)=>{
    return index !== i
  });
  // update storage
  this.saveItems();
  //select prev item or none if list is empty
  if(this.toreadItems.length) {
    let newIndex = (i === 0) ? 0 : i -1;
    //assign active class to newIndex
    $('.read-item').eq(newIndex).addClass('is-active');
  } else {
    // if no items left put back noitems message
    $('#no-items').show();
  }
};
```

### Lecture 45 - Application Menu

* we add an app menu with standard functionality and keyboard accelerators
* we separate menu logic in a separate file
* to access item.js functions from menu.js click events we make them window global functions
* element indexing in jquery is 1 based we need to -1 to make them 0 based array index
* the custom part of menu.js
```
// module 
const {remote} = require('electron');

// menu tempalte object
const template = [
  {
    label: 'Items',
    submenu: [
      {
        label: 'Add New',
        accelerator: 'CmdOrCtrl+o',
        click () {$('.open-add-modal').click()}
      },
      {
        label: 'Read Item',
        accelerator: 'CmdOrCtrl+Enter',
        click () { window.openItem()}
      },
      {
        label: 'Delete Item',
        accelerator: 'CmdOrCtrl+Backspace',
        click () { window.deleteItem() }
      },
      {
        label: 'Open in Browser',
        accelerator: 'CmdOrCtrl+Shift+Enter',
        click () { window.openInBrowser()}
      },
      {
        type: 'separator',
      },
      {
        label: 'Search Items',
        accelerator: 'CmdOrCtrl+s',
        click () { $('#search').focus()}
      }
    ]
  },
```

### Lecture 46 - Application Packaging

* [iconvert icons](https://iconverticons.com/)
* [Application Distribution](https://electronjs.org/docs/tutorial/application-distribution)
* [NPM electron-packager](https://www.npmjs.com/package/electron-packager)
* [electron-packager API doc](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md)
* we start our packaging effoert from package.json
  * we give aproper name at our app and a description
  * we remove script section (under the condition that we create a separate folder for packaging our app as we need the scripts for development)
  * we remove the repository section
  * we remove the keywords (only needed for open source projects)
  * update author
  * remove licence and bug section
  * update homepage
  * remove dev dependencies (given we package from a copyof our working dir)
* we remove electron reload statement
* we remove openDevTools call
* electron provides extensive documentation on packaging
* we will use electron-packager module. we install it globally `npm install -g electron-packager`
* being in our project root dir we run 'electron-packager .' it fails. it asks for electron version
* we can put it in package.json dependencies. to avoid bundling it in our app thus bloating size we pass it in command line specifing the version we evelooped our app with (for us 1.8.4) `electron-packager . --electron-version="1.8.4"`
* packager downloads it and packages the app for our operating system
* it puts it in a new folder <App name>-<platform> e.g. Readit-linux-x64
* in this folder we have an executable (depnding on our dev machine op system)
* in the package folder also in the resources/app folder we have our source files
* if we want to hide our source files we can package thenm in an asar archive (like a tar file) without compression. our files canbe unpacked and viewed with some tools but hey are protected from common user
* to see thisin action we remove the package folder and repackage it with the --asar flag true `electron-packager . --electron-version="1.8.4" --asar=true`
* in the resources folder now we have asar files for our folders
* to add an icon we add an icon file in the project root directory. we need different formats of an image for an app (our original is 1024x1024 in png format). a png for linus, an ico file for win and icns file for mac
* there are plenty of tools that do image conversion but we use *iconver icons*
* in project root folder e create anew folder called icons to put our icons. for ubunctu we will use 64by64 png
* for linux the icon is not packaged but referenced in the window creator config object
```
  this.win = new BrowserWindow({
    width: 500, 
    height: 650,
    minWidth: 350,
    minHeight: 650,
    icon: `${__dirname}/icons/64x64.png`
  });
```
* for windows and mac icon is bundled with app. so we sould have an .ico and .icns and .png file named icon in our root folder and an icons folder with various sizes of ng for ubuntu
* we repackage our project with ` electron-packager . --electron-version="1.8.4" --asar=true -icon=icon --overwrite` setting an icon (no need to pec filetype) and overwrite as we dont delete our package but overwrite it
* electron-packager provides what we need to take our electron app to app stores
* Our  app runs smoothly

## Section 9 - Distribution Overview

### Lecture 47 - Distribution Overview

* we will now see how to use the more popular electron-builder together with auto-updates to manage full lifecycle of our app
* if we are to publish updated outside of app stroes this means we need a dedicated applications update server. this is unwanted complexity. we can achieve same results with github releases
* we will learn how to sign our code

### Lecture 48 - Electron builder

* [electron-builder API](https://www.electron.build/)
* [Apple application categories](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8)
* electron builder is a full deatured tool. it allows packaging,signing and releasing our app
* it has a highly configurable workflow
* it allows us to publish/release new versions of our app automatically
* we remove our packaged app `rm -rf Readit-linux-x64`
* we install electron-builder globally `npm i -g electron-builder`
* having globall installed modules is not good. we will later do local installs of our build tools and call them from package.json scripts as project dependencies, we dont want electron-builder bundled in the final package (install it as a dev dependency) `npm i --save-dev electron-builder`
* we will use the build command of the electron-builder cli. we can build for mac/win/linux in a mac but only for win/linux in win
* we first build for mac `electron-builder build -m zip` -m means mac and zip is the target of the build 
* build complains because app is not signed
* we get a new folder in our project named *dist* for distribution which hosts the build. in it there is a zip file with the built app and a platform specific dir with the source of the app
* to run the app we extract the zip and run the executable
* to stop using the global module and use the local installed module we add a script in our package.json file. we add 2 scripts (a start to run our prebuilr app using electron and a build command for mac, not applicable if ewe build from win). in electron-builder build command is the default so we can ommit it
```
  "scripts": {
    "start": "electron .",
    "mac": "electron-builder -m"
  },
```
* we need to tackle the icon. electron-buoilder doc says that icons must be places in a directory  called build. we make a new dir in project root called *build* and put the icons (in 3 formats for every platform) in there
* alternative we have to specify another dir with the buildresources flag pointing to the dir
* we put our build configuration in package.json
```
 "build": {
    "appId": "com.stackacademy.readdit",
    "directories": {
      "buildResources": "."
    },
    "mac": {
      "category": "public.app-category.productivity",
      "target": "dmg"
    }
  },
```
* we set trhe appid and the dir where our resources aare  and also mac specific configuration (appstore, target)
* we build for mac `npm run mac` and see our script in action. in dist we have only dmg file, we mount it in mac and app is instllaed with an icon
* linux and win have their build options whic

### Lecture 48 - Code Signing

* [Apple Dev Program](https://developer.apple.com/programs/)
* [Comodo COde Signing](https://www.comodo.com/business-security/code-signing-certificates/code-signing.php)
* [Electron-builder code signing](https://www.electron.build/code-signing)
* code signing is important  for people to trust our app, if not signed platforms will complain about our app
* also auto update module we will implement wont work without it
* self signed certificate is ok for development and testing but for a real world app we need one from a trusted authority
* in electron-builder docs there is a section for code-signing. it has a bunch of env ironment variable we must set up
* to get a code siging certificTE FOR APPLE Is straight forward if we have enrolled in apple developers program
* for MAC: we open keychain access app -> Menu -> Cerificate Assistant -> Create a Certificate -> Add name, Identity Type: Self Signed Root, Cerificate Type: Code Signing -> Confirm -> Our self signed cerificate is added to the keychain (slect all items). Right click on it -> Get Info -> expand trust section -> change when using this certificate : Always trust (treat it as an apple certificate). For our machine is OK. for other machines installing our app it will complain
* we run the mac build (from mac) 'npm run mac' the build gives no complains, it asks our pswd to sign the app
* we remove the build target attribute for mac in package.json as we want electron-build to choose the default package type for releases
* net he dows a windows build from mac. windows accepts 2 types of certificates a) EV Code Signing Certificate b) Code Signing Ceritificate. 
* app certicates in windows are more generic, they are not auto detectable from electron-buildetr, we have to tell in configuration where to look for the cerificates.
* the relevant proerty is *cerificateFile*. electron-builder prefers the use of env variable CSC_LINK, but we use the package.json
* we will export the newly created self signed certificate for windows. in keychain list we filter for Ceritificates. right click on it -> export -> Fileformat: p12. we are prompted to create a certificate password. he doesn use one. we have a certificate file at dektop (on mac),
we move it in the project and add it to .gitgnore IMPORTANT to exclude it for github. in .gitgnore we add folders dist/ private/ and noe_modules/
* in package.json in win build object we add 
```
    "win": {
      "certificatFile": "private/readit.p12",
      "verifyUpdateCodeSignature": false
    },
```
* first is the location and second is a param to accept selfsignedsignatures