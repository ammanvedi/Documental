
( function( Utils, color ) {

	var error = color.red;
	var warn = color.yellow;
	var notice = color.greenBright;
	var stage = color.cyanBright;
	var doctext = color.cyan;

	/**
	 * pretty print a stage in processing
	 *
	 * @param {string} string text to print
	 */
	Utils.logStage = function( string ) {
		console.log( doctext('documental' + stage(" " + string ) ) );
	};

	/**
	 * pretty print a error in processing
	 * @param {string} string text to print
	 */
	Utils.logError = function( string ) {
		console.log( doctext('documental' + error(" " + string ) ) );
	};

	/**
	 * pretty print info from processing
	 * @param {string} string text to print
	 */
	Utils.logInfo = function( string ) {
		console.log( doctext('documental' + notice(" " + string ) ) );
	};

} )( documentalCore.utils, clc );