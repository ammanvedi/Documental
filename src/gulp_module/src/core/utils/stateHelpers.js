
( function( Utils, State ) {

	/**
	 * clear the saved comments and positions this is called at the end of each file parse
	 */
	Utils.clearCommentCache = function () {
		State.commentsHash = {};
		State.namespaceHash = {};
		State.totalAppendedChars = 0;
	};

} )( documentalCore.utils, documentalCore.state );


( function( Utils, State ) {

	/**
	 * add information to the global source map
	 *
	 * @param {object} updatemap the source map to update
	 * @param {string} name namespace string of item to add
	 * @param {docNode} [docu] the documentation info for the item
	 * @param {string} [src] the source string for the item
	 * @param {string} [file] the filename where the item is located
	 * @param {locationNode} location location of the item in the source file
	 */
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

	/**
	 * return the global source map
	 * @returns {string} stringified version of the global source map
	 */
	Utils.getSourceMap = function () {
		return JSON.stringify( State.sourceMap );
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	/**
	 * return the project name
	 * @returns {string} project name
	 */
	Utils.getProjectName = function () {
		return State.project;
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	/**
	 * get the global autocomplete config
	 * @returns {string} string representation of the auto complete object
	 */
	Utils.getAutocomplete = function () {
		return JSON.stringify( State.autocomplete );
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	/**
	 * get a figure representing how many functions of those detected have been documented
	 * @returns {number} percentage documented
	 */
	Utils.getPercentDocumented = function () {
		return ( State.totalCommented / State.total) * 100;
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	/**
	 * get total number of functions found
	 *
	 * @returns {number} total functions
	 */
	Utils.getTotal = function () {
		return State.total;
	};

} )( documentalCore.utils, documentalCore.state );















