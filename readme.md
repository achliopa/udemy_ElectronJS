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