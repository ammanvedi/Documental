

( function( Utils, nodeUtil ) {

	Utils.general = {};

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

	Utils.general.getUserYesNo = function( questionString, yesCallback, noCallback ) {

		process.stdin.resume();
		process.stdin.setEncoding('utf8');

		Utils.logInfo( questionString );

		process.stdin.on('data', function (text) {



			text = nodeUtil.inspect(text);
			console.log( text );


			if ( text === '\'y\n\'' || text === '\'yes\n\'' ) {
				console.log( "yescb" );
				if( yesCallback && typeof yesCallback === "function"  ) {
					console.log( "yescb" );
					yesCallback();
				}
			}

			if ( text === 'n\n' || text === 'no\n' ) {
				if( noCallback && typeof noCallback === "function" ) {
					noCallback();
				}
			}
		});

	}


} )( documentalCore.utils, nodeUtil );