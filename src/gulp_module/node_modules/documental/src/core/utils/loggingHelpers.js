/**
 * Created by ammanvedi on 30/01/2016.
 */
( function( Utils, color ) {

	var error = color.red;
	var warn = color.yellow;
	var notice = color.greenBright;
	var stage = color.cyanBright;
	var doctext = color.cyan;


	Utils.logStage = function( string ) {
		console.log( doctext('documental' + stage(" " + string ) ) );
	};


	Utils.logError = function( string ) {
		console.log( doctext('documental' + error(" " + string ) ) );
	};


	Utils.logInfo = function( string ) {
		console.log( doctext('documental' + notice(" " + string ) ) );
	};



} )( documentalCore.utils, clc );