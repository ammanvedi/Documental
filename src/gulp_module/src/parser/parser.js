
( function( Plugins, Utils, State, Constants ) {

	/**
	 * the core function that walks the spidermonkey ast of a source file
	 *
	 * @param {object} file the gulp file object
	 * @param {string} sourceString the source file text
	 * @param {object} acornInstance the npm acorn instance
	 * @param {object} walk the acorn walk npm instance
	 * @returns {string} source string
	 */
	Utils.determineFunctions = function ( file,  sourceString, acornInstance, walk ) {

		State.file = file;

		var methodCount = 0;
		var ast;
		var pluginNames = Object.keys( Plugins );

		State.currentFunctionBoundaries = 0;


		try {
			ast = acornInstance.parse( sourceString, {
				locations: true,
				ranges: true,
				directSourceFile: true,
				onComment: Utils.commentFunction
			} );

			walk( ast, function ( node ) {

				var pluginResults = [];

				pluginNames.map( function( name ) {
					pluginResults.push( Plugins[ name ]( node ) );
				} );

				pluginResults.map( function( res ) {
					Utils.processResult( res, sourceString, file.name );
				} );
			} );

		}catch( e ) {
			Utils.logError( 'source parsing failed on file ' + file.path );
			Utils.logError( 'message -  ' + e.toString() );
		}


		//State.total += methodCount;
		Utils.clearCommentCache();
		return sourceString;
	};

	/**
	 * process the result of the plugin and add it to the source map + autocomplete
	 * objects
	 *
	 * @param {pluginResult} pluginResult the plugin result to deal with
	 * @param {string} sourceString full source string of file
	 */
	Utils.processResult = function( pluginResult, sourceString ) {
		if( pluginResult ) {
			var body = sourceString.substring( pluginResult.sourceStart, pluginResult.sourceStop );
			var par = Utils.paramsToStringRepresentation( Utils.getSimpleParameters( pluginResult.rightside ) );
			var doc = Utils.findComments( pluginResult.rightside.loc );
			if ( doc == -1 ) {
				//console.log( 'method : ', name, ' not documented'  );
				var newdocstring = Utils.autoGenerateDocStub( sourceString, pluginResult.rightside, pluginResult.name );
				doc = doctrine.parse( newdocstring, Constants.doctrineConfig );
			}

			var fpath = State.file.path.split( "/" );
			var filenamed = fpath[ fpath.length - 1  ] ;

			var loc = pluginResult.rightside.loc;

			pluginResult.name = Utils.useRulesDetermineNamespace( pluginResult.name, doc, pluginResult.sourceStart, pluginResult.sourceStop );
			//console.log( pluginResult.name );

			Utils.addMemberToSourceMap( State.sourceMap, pluginResult.name, doc, body, filenamed, loc );
			State.autocomplete.push( { n: pluginResult.name, t: pluginResult.terminal } );
		}
	}

} )( documentalCore.plugins, documentalCore.utils, documentalCore.state, documentalCore.constants );