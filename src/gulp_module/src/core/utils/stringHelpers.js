
( function( Utils, State ) {

	/**
	 * remove the leading . from a namespace if it exists
	 *
	 * @param {string} name namespace name, which may begin with a .
	 * @returns {string} namespace string
	 */
	Utils.cleanName = function ( name ) {
		if ( name.charAt( 0 ) === "." ) {
			return name.substring( 1 );
		}
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	/**
	 * take two dot format namespace strings and combine them at a certain index
	 *
	 * @param {string} a namespace string one
	 * @param {string} b namespace string two
	 * @param {integer} idx the index ( based on splitting by dot ) on which to combine
	 * @returns {Array.<string>}
	 */
	Utils.combineNamespacesAtIndex = function( a, b, idx ) {

		a = a.split( '.' );
		b = b.split( '.' );
		return Array.prototype.concat( a.splice( 0, idx ), b.splice( idx, b.length ) )
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	/**
	 * Given two namespaces, which may begin similarly determine the index
	 * at which the diverge
	 *
	 * @param {string} a namespace one
	 * @param {string} b namespace two
	 * @returns {number} the index ( based on dot format ) at which namespaces differ
	 */
	Utils.findIndexOfDifference = function( a, b ) {

		//given two arrays check at which index do they
		//diverge into non-directly matching arrays

		var index = -1;
		//only iterate as fara as the smallest array
		var smallestLength = a.length <= b.length ? a.length : b.length;

		for( var c = 0; c < smallestLength; c++  ) {
			if( a[ c ] === b[ c ] ) {
				index ++;
			} else {
				return index;
			}
		}

		return index;

	};

} )( documentalCore.utils, documentalCore.state );