

( function( Utils, nodeUtil ) {

	Utils.general = {};

	/**
	 * determine if an object has a set of properties, used for config validation
	 *
	 * @param {object} object object to check
	 * @param {Array.<string>} properties properties the object should have
	 * @returns {boolean} weather the object contains all the desired properties
	 */
	Utils.general.checkProperties = function( object, properties ) {

		if( object instanceof Object && properties instanceof Array ) {

			var keys = Object.keys( object );

			return properties.filter( function( item ) {

				var contains = keys.indexOf( item );

				return contains === -1;

			} ).length;

		}

		return false;

	};

} )( documentalCore.utils, nodeUtil );