
( function( Plugins, Utils, State ) {

	/**
	 * identify functions declared as vars
	 *
	 * @param {spidermonkeyASTNode} node node to parse
	 * @returns {pluginResult} the result of parse
	 */
	Plugins.variableDeclaration = function( node ) {

		var sourceStart, sourceStop, rightside, terminal, name;
		var foundApplicableFunction = false;

		if ( node.type == 'VariableDeclaration' ) {
			node.declarations.forEach( function ( declaration, declIndex ) {
				if ( declaration.init && declaration.init.type == 'FunctionExpression' ) {

					rightside = declaration.init;
					sourceStart = node.start;
					sourceStop = declaration.init.end;
					name = Utils.cleanName( Utils.recurseUpTree( node ) );

					if ( !name ) {
						name = declaration.id.name;
					} else {
						name += "." + declaration.id.name
					}

					terminal = name.split( '.' )[ name.split( '.' ).length - 1 ];

					foundApplicableFunction = true;
				}
			} )
		}


		if( foundApplicableFunction ) {
			return {
				"sourceStart": sourceStart,
				"sourceStop" : sourceStop,
				"rightside" : rightside,
				"terminal" : terminal,
				"name" : name
			}
		}

		return false;
	}

} )( documentalCore.plugins, documentalCore.utils, documentalCore.state );
