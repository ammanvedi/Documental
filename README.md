![MacDown logo](http://i.imgur.com/bJlqZD2.png)

![npm logo](https://badge.fury.io/js/documental.svg)


Documental is a build tool to automatically generate a documentation site from your javascript source code. The aim of documental was not only to allow for easy generation of docs for functions that have them but to also expose the functions that do not have documentation and provide an easy way of searching and navigating at the same time.

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

## Usage
### Node Module
Documental is a Gulp module, so you can install it with npm ( without cloning this repo ) ...
<pre><code>npm install documental --save-dev</code></pre>
and use the generation module in your gulp build like so...
<pre><code>var Documental = require('Documental' ).Documental;</code></pre>

#### Configuration
A configuration file **documental.config.json** should be placed alongside the gulp file that you use to build your project.

just a couple of configuration items are needed for the module to get going, the minimal configuration object provides the following;

<pre><code>{
	projectName: "My-Application",
	jsonLocation: "/path/to/json/out"
}
</code></pre>

this configuration is required should you decide to use the bundled angular app to display your docs. At the very least an output location should be provided.

#### Run the generation
below is a simple gulp task that ingests the desired files/directories and then generates documentation JSON

<pre><code>gulp.task('docs', function () {
    gulp.src([ '../../../pulse-js/src/**/*.js'])

        //ingest the file into the documental instance
        .pipe(Documental.utilities.ingest())

        //when all files finished output the JSON
        .on( 'finish', function(){Documental.utilities.exportDataToJSON();});
});
</code></pre>

#### The Output
Documental outputs three JSON files each with a specific function that will be useful weather the bundled angular app is used or not;

1. < project-name >-autocomplete.json
2. < project-name >-menuTree.json
3. < project-name >-sourcemap.json

**autocomplete.json**
This JSON file contains pairs of namespaced function names alongside their more common names ( i.e. a search term for comparison and a logical path location )

**menuTree.json**
A menu tree is also generated, levels and nesting are decided by the namespacing of functions.

within the the Angular app [EasyTree](http://www.easyjstree.com/) is being used currently to generate the tree view of the source, the format of this tree follows the easytree format.

**sourcemap.json**
The main meat of the operation is located in the sourcemap. This contains the source code of each function as well as other neccacary properties such as its namespace and any associated JSDoc tags.

These files can now be consumed however you choose!

### Angular App

First grab the project dependancies using bower and npm;
<pre><code>user# cd src/app/
user# bower install
...
user# npm install
...
</code></pre>

build the app code with gulp
<pre><code>user# gulp
</code></pre>

The app will be built to the dist/ directory, JSON generated from the node moduke can be placed in the dist/data directory

#### Adding Documentation
The app/dist/data/ directory is where the app will look for the three JSON files generated by the node module. These files should be placed here ( this location can be placed in the documental.config.json if desired )

#### Accessing Documentation
The documentation can be accessed through the Angular app using the project name that was given to the documental.config.json file.

for example if running a localhost server from the app/dist directory

<pre><code>localhost:8000/#/docs/my-application
//or more generally
localhost:8000/#/docs/< project-name >
</code></pre>

