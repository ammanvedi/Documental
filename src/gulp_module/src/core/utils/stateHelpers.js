/**
 * Created by ammanvedi on 25/01/2016.
 */

( function( Utils, State ) {

	Utils.clearCommentCache = function () {
		State.commentsHash = {};
		State.namespaceHash = {};
		State.totalAppendedChars = 0;
	};

} )( documentalCore.utils, documentalCore.state );


( function( Utils, State ) {

	Utils.addMemberToSourceMap = function ( updatemap, name, docu, src, file, location ) {
		var memberpath = name.split( "." );
		var islast = false;

		for ( i = 0; i < memberpath.length; i++ ) {
			if ( updatemap[ memberpath[ i ] ] == undefined ) {
				updatemap[ memberpath[ i ] ] = {}
			}
			updatemap = updatemap[ memberpath[ i ] ];
		}
		updatemap[ "Documentation" ] = docu;
		if ( src ) {
			updatemap[ "Source" ] = src;
		}

		updatemap[ "Documentation" ][ "file" ] = file;
		updatemap[ "Documentation" ][ "loc" ] = location;

	};

} )( documentalCore.utils, documentalCore.state );


( function( Utils, State ) {

	Utils.getSourceMap = function () {
		return JSON.stringify( State.sourceMap );
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.getProjectName = function () {
		return State.project;
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.getAutocomplete = function () {
		return JSON.stringify( State.autocomplete );
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.getPercentDocumented = function () {
		return ( State.totalCommented / State.total) * 100;
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.getTotal = function () {
		return State.total;
	};

} )( documentalCore.utils, documentalCore.state );















