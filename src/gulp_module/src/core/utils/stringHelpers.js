/**
 * Created by ammanvedi on 25/01/2016.
 */

( function( Utils, State ) {

	Utils.cleanName = function ( name ) {
		if ( name.charAt( 0 ) === "." ) {
			return name.substring( 1 );
		}
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.combineNamespacesAtIndex = function( a, b, idx ) {

		a = a.split( '.' );
		b = b.split( '.' );
		var comb = Array.prototype.concat( a.splice( 0, idx ), b.splice( idx, b.length ) );
		//console.log( a, b, idx );
		//console.log( comb.join( "." ) );

		return comb;

	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

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