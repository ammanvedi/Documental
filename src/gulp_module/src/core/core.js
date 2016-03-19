/*
 *
 *		 ____                                                    __             __
 *		/ __ \  ____   _____  __  __   ____ ___   ___    ____   / /_  ____ _   / /
 *	   / / / / / __ \ / ___/ / / / /  / __ `__ \ / _ \  / __ \ / __/ / __ `/  / /
 *	  / /_/ / / /_/ // /__  / /_/ /  / / / / / //  __/ / / / // /_  / /_/ /  / /
 *	 /_____/  \____/ \___/  \__,_/  /_/ /_/ /_/ \___/ /_/ /_/ \__/  \__,_/  /_/
 *
 *              your friendly neighbourhood documentation generator
 *
 */

/**
 * an object defining what a plugin should return to add info to the source map
 * @typedef {object} pluginResult
 * @property {sourceLocationNode} sourceStart start of the source item
 * @property {sourceLocationNode} sourceStop end of the source item
 * @property {spidermonkeyASTNode} rightside the ast node of the item to be added to the map
 * @property {string} terminal the common/local name of the item e.g. getAttribute
 * @property {string} name the namespaced name of the item e.g. node.prototype.getAttribute
 */

/**
 * an object representing a menu node. Conforms to the easytree standard
 * @typedef {object} menuNode
 * @property {string} text the label text of the menu item
 * @property {string|boolean} [isExpanded] weather to auto-expand the node on menu render
 * @property {Array.<menuNode>} children the items children
 * @property {string} path this is a custom attribute that will be rendered on the li as data-path ( here used as the namespace )
 */

/**
 * spidermonkey AST Node - https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
 * @typedef {object} spidermonkeyASTNode
 */

/**
 * describe the location of a source item
 * @typedef {object} locationNode
 * @property {integer} line line number
 * @property {integer} column column number
 */

/**
 * location node describing the page location of a source item start and end
 * @typedef {object} sourceLocationNode
 * @property {locationNode} start the start location
 * @property {locationNode} end the end location
 */

/**
 * information present inside a documentation object as output into the source map
 * @typedef {object} docNode
 * @property {string} description JSDOC description
 * @property {Array.<Object>} tags array of JSDOC tags
 * @property {string} file the file name from which the source was parsed
 * @property {sourceLocationNode} loc location of this item in source
 */

/**
 * Object describing what info is present in a documented function node inside the sourcemap JSON object
 * @typedef {object} sourceNode
 * @property {docNode} Documentation doc info for the function / source item
 * @property {string} Source the source text of the source item.
 */


var acorn = require( 'acorn' );
var walk = require( 'walk-ast' );
var modify = require( 'gulp-modify' );
var doctrine = require( "doctrine" );
var fs = require( 'fs' );
var gulp = require( 'gulp' );
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var open = require("openurl");
var runSequence = require('run-sequence');
var marked = require('marked');
var clc = require('cli-color');
var nodeUtil = require('util');
var vftp = require('vinyl-ftp');
var vfs = require('vinyl-fs');
var map = require('map-stream');
var file = require('gulp-file');
var del = require('del');

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

var config;

//attempt to include the config



try {
	config = require( process.cwd() + '/' + 'documental.config.json' );

}catch( e ) {

	console.log( 'ERROR: config could not be loaded' );

}


	var documentalCore = {
		constants: {
			doctrineConfig: {
				unwrap:true,
				recoverable: true,
				sloppy: true
			}
		},
		plugins: {},
		utils: {},
		state: {
			file: false,
			sourceMap: {},
			commentsHash: {},
			typeDefs: {},
			namespaceHash: {},
			autocomplete: [],
			total: 0,
			totalCommented: 0,
			totalAppendedChars: 0,
			nestedFunctionBoundaries: 0,
			currentFunctionBoundaries: 0,
			par: "root",
			docAppPath: "./node_modules/documental/app/dist/data/",
			Tree: {},
			tagConfig: {
				"augments": false, "author": false, "argument": false, "borrows": false, "class": false,
				"constant": false, "constructor": true, "constructs": false, "default": false, "deprecated": true,
				"description": false, "event": false, "example": false, "extends": false, "field": false,
				"fileOverview": false, "function": false, "ignore": false, "inner": false, "lends": false,
				"link": false, "memberOf": false, "name": false, "namespace": false, "param": true, "private": true,
				"property": false, "public": true, "requires": false, "returns": true, "return": true, "see": false,
				"since": false, "static": false, "throws": false, "type": false, "version": false
			}
		}
	};

	var documental = {};
