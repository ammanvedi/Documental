/**
 * Created by ammanvedi on 25/01/2016.
 */


( function( Plugins, Utils, State ) {

	Plugins.functionDeclaration = function( node ) {

		var sourceStart, sourceStop, rightside, terminal, name;
		var foundApplicableFunction = false;

		if ( node.type == 'FunctionDeclaration' ) {
			rightside = node;
			sourceStart = node.start;
			sourceStop = node.end;
			terminal = node.id.name;
			name = node.id.name;
			foundApplicableFunction = true;
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

