/**
 * Created by ammanvedi on 25/01/2016.
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
