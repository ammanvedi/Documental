/**
 * Created by ammanvedi on 25/01/2016.
 */

( function( Plugins, Utils, State ) {

	/**
	 * identify functions declared as expressions
	 *
	 * @param {spidermonkeyASTNode} node node to parse
	 * @returns {pluginResult} the result of parse
	 */
	Plugins.expressionStatement = function( node ) {

		var sourceStart, sourceStop, rightside, terminal, name;
		var foundApplicableFunction = false;

		if ( node.type == 'ExpressionStatement' ) {

			if ( node.expression && node.expression.left && node.expression.right && node.expression.left.type == 'MemberExpression'
				&& (node.expression.right.type == 'FunctionExpression' || node.expression.right.type == "CallExpression" ) ) {

				rightside = node.expression.right;
				if ( node.expression.right.type == "CallExpression" ) {
					rightside = node.expression.right.callee
				}
				sourceStart = node.expression.left.start;
				sourceStop = rightside.end;
				if ( rightside.type == "FunctionExpression" ) {

					try{
						name = Utils.postOrderTraverse( node.expression.left );
					} catch( e ) {
						console.log( node.expression.left );
					}

					prefix = Utils.cleanName( Utils.recurseUpTree( node ) );
					if ( prefix ) {
						name = Utils.cleanName( Utils.recurseUpTree( node ) ) + "." + name;
					}
					terminal = name.split( '.' )[ name.split( '.' ).length - 1 ];
					foundApplicableFunction = true;
				}

			}
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