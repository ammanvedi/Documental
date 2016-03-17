![MacDown logo](http://i.imgur.com/bJlqZD2.png)

![npm logo](https://badge.fury.io/js/documental.svg)

Please Note: This is currently a work in progress !


Documental is a build tool to automatically generate a documentation site from your javascript source code. The aim of documental was not only to allow for easy generation of docs for functions that have them but to also expose the functions that do not have documentation and provide an easy way of searching and navigating at the same time.


![img](http://i.imgur.com/wrBxGlZ.png "in action")

# Contents
1. [Usage](#usage)
2. [Development](#development)
3. [Angular App](#angularapp)

## Nuts & Bolts
The project is made up of two ( separable ) parts;

1. The node module
2. The angular ( 1.4.7 ) app

**Node Module**
<pre><code>src location : src/gulp/node_modules/Documental/...</code></pre>

Documental uses JSDoc as the standard for identifying documentation comments ( comments preceeding a function that begin with /** ) These comment are found and parsed by creating a syntax tree within each source file then traversing it to couple functions with their associated documentation.

If no documentation exists the function will still be available in the documentation but will display a "This needs documentation" description to the user.



**Angular App**
<pre><code>src location : src/app/...</code></pre>

The angular app component of the project is a simple web app that can be used to display the JSON documentation generated in the node module. it provides;

* Separate Pages for each project documented
* Source code display
* Tree view code navigation based on function namespace
* Project readme display

<div id='usage'/>
## Usage
### Node Module
Documental is a Gulp module, so you can install it with npm ( without cloning this repo ) ...
<pre><code>npm install documental --save-dev</code></pre>
and use the generation module in your gulp build like so...
<pre><code>var Documental = require('Documental' )</code></pre>


#### Run the generation
below is a simple gulp task that ingests the desired files/directories and then generates documentation JSON

<pre><code>var gulp = require('gulp');
var Documental = require( 'Documental');

gulp.task('docs', function () {
    return gulp.src([ 'test-projects/pulse-js/src/**/*.js']).pipe(Documental());
});
</code></pre>

#### Options
`--ftp` however you decide to include the call to documental in your build you can pass this CLI flag into the task ( e.g. `gulp docs --ftp` ) which will initiate an ftp upload as well as building the docs.

#### Configuration
A configuration file **documental.config.json** should be placed alongside the gulp file that you use to build your project.

just a couple of configuration items are needed for the module to get going, the minimal configuration object provides the following;

<pre><code>{
  "projectName": "My Project",
  "useApp" : true,
  "liveLoad" : false,
  "readme" : "./path/to/readme.md",
  "jsonOutput": "/outpath",
  "verbose": false,
  "port": 8090,
  "ftp": {
    "location" : "/mnt/data",
    "htmlLocation": "/mnt/cdn/test/amman/docs/partials",
    "server" : "host.com",
    "username": "usr",
    "password": "pass"
  },
  "ftpAuto" : false
}
</code></pre>

this configuration is required should you decide to use the bundled angular app to display your docs. At the very least an output location should be provided.

|   Property	|   Description	| 
|---	|---	|---	|
|   projectName	|   what to refer to the project as, this is used in generation of the menu trees	|  
|   useApp	|   weather to use the bundled angular app	|   
|   liveLoad	|   launch the documentation app in a browser automatically	|   
|   readme	|   path to a readme file ( relavant if using the bundles angular app, relative to gulpfile )	|  
|   jsonOutput	|   location where json files should be output ( relative to giulpfile )	|   
|   verbose	|   show extended logging information	|  
|   port	|   if launching the angular app, which port should we create a server on (default 3000)	|  
|   ftp	|   basic ftp information	|  
|   ftp.location	|   location on server where json files should be put ( absolute )	|   
|   ftp.htmllocation	|   location on server where html generated from readme should be put ( absolute )	|  
|   ftpAuto	|   automatically deploy the files to ftp on every build	|  


#### The Output
Documental outputs three JSON files each with a specific function that will be useful weather the bundled angular app is used or not;

1. < project-name >-autocomplete.json
2. < project-name >-menuTree.json
3. < project-name >-sourcemap.json

**autocomplete.json**
This JSON file contains pairs of namespaced function names alongside their more common names ( i.e. a search term for comparison and a logical path location )

**menuTree.json**
A menu tree is also generated, levels and nesting are decided by the namespacing of functions.

within the the Angular app a slightly changed version of [EasyTree](http://www.easyjstree.com/) is being used ( fork at [my github](https://github.com/ammanvedi/EasyTree.git) ) currently to generate the tree view of the source, the format of this tree follows the easytree format.

**sourcemap.json**
The main meat of the operation is located in the sourcemap. This contains the source code of each function as well as other neccacary properties such as its namespace and any associated JSDoc tags.

These files can now be consumed however you choose!

<div id='development'/>
#### Development

build the gulp module from source

<pre><code>user# cd src/
user# npm install
user# gulp build-npm
user# gulp --gulpfile test.gulpfile.js docs 
</code></pre>

you can now adjust test.gulpfile.js to point to the desired files and run the documentation task. Note; if you want to use the app when building from source, make sure you have built this also. The process is outlined below.

##### Source Structure

First grab the project dependancies using bower and npm;
<pre><code>
+- documental
|-- src
|--- core 
|---- appBuilder
|---- utils
|----- Util Functions 
|---- core.js
|---- export.js
|
|--- parser
|---- plugins
|----- Plugin Files
|---- parser.js
|--- gulpfile.js 
</code></pre>

The first point of call in extending the basic functionality of documental is from the plugins aplugin takes a SpiderMonkey AST node and returns an object in the following standard ( or false )

<pre><code>
{
	"sourceStart": {SpiderMonkey Location Object},
	"sourceStop" : {SpiderMonkey Location Object},
	"rightside" : {SpiderMonkey Function Node },
	// common name for the application property
	"terminal" : {string},
	// full name for the application property ( can be namespaced e.g. "app.foo.bar" )
	"name" : {string}
}
</code></pre>

these are returned to the parser which will then integrate the data into the menu / sourcemap / autocomplete files. Adding another layer in the parsing is as simple as creating a new source file and extending the documentalCore.plugins object with a function, having the signiture;
<pre><code>Plugins.newplugin = function( node ) { ... }</code></pre>

examples can be found in the already existing plugins.


<div id='angularapp'/>
### Angular App



build the app code with gulp
<pre><code>user# gulp app
</code></pre>
The app will be built to the dist/ directory, JSON generated from the node module can be placed in the dist/data directory

build the app code to the gulp module directory ( source ) 
<pre><code>user# gulp build-app-dist
</code></pre>

build the app code to a ftp location, defined in app/ftp.config.json
<pre><code>user# gulp deploy
</code></pre>



#### Adding Documentation
The app/dist/data/ directory is where the app will look for the three JSON files generated by the node module. These files should be placed here ( this location can be placed in the documental.config.json if desired )

#### Accessing Documentation
The documentation can be accessed through the Angular app using the project name that was given to the documental.config.json file.

for example if running a localhost server from the app/dist directory

<pre><code>localhost:8000/#/docs/my-application
//or more generally
localhost:8000/#/docs/< project-name >
</code></pre>

