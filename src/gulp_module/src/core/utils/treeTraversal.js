/**
 * Created by ammanvedi on 25/01/2016.
 */

( function( Utils, State, cfg ) {

	Utils.recurseMenuTree = function ( sourceObject, tree, nodename, menu, workingpath ) {

		var noden = nodename || State.project;
		tree = tree || " ";

		if( cfg.verbose ) {
			console.log( tree + noden );
		}

		menu.text = noden;

		if ( menu.text === State.project ) {
			menu.isExpanded = "true";
		}

		if ( menu.children ) {

		} else {
			menu.children = [];
		}

		if ( typeof sourceObject === "object" && sourceObject !== null && !sourceObject[ "description" ] ) {
			//console.log(sourceObject);
			var keys = Object.keys( sourceObject );
			tree = tree + " ";
			var ct = 0;


			if ( noden === State.project ) {
				workingpath = "";
			} else {
				if ( workingpath === "" ) {
					workingpath = noden;
				} else {
					workingpath = workingpath + "." + noden;
				}

			}

			for ( var x = 0; x < keys.length; x++ ) {
				if ( keys[ x ] === 'Documentation' || keys[ x ] === 'Source' ) {

					ct++;
					continue;
				}
				if ( noden !== "Documentation" && keys[ x ] !== 'Documentation' ) {

					var augpath;
					if ( workingpath === "" ) {
						augpath = keys[ x ];
					} else {
						augpath = workingpath + "." + keys[ x ];
					}
					menu.children[ x - ct ] = {
						text: noden,
						children: [],
						path: augpath
					};

					Utils.recurseMenuTree( sourceObject[ keys[ x ] ], tree, keys[ x ], menu.children[ x - ct ], workingpath );
				}

			}
		}

	};

} )( documentalCore.utils, documentalCore.state, config );

( function( Utils, State ) {

	Utils.makeMenuTree = function () {
		Utils.recurseMenuTree( State.sourceMap, "", "", State.Tree, "" );
		return JSON.stringify( [ State.Tree ] );
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.makeMenuTree = function () {
		Utils.recurseMenuTree( State.sourceMap, "", "", State.Tree, "" );
		return JSON.stringify( [ State.Tree ] );
	};

} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.recurseUpTree = function ( node ) {

		if ( node.parentNode.type == "AssignmentExpression" ) {
			return Utils.recurseUpTree( node.parentNode ) + "." + Utils.postOrderTraverse( node.parentNode.left );
		}
		if ( node.parentNode.type == "VariableDeclaration" ) {
			return Utils.recurseUpTree( node.parentNode ) + "." + node.parentNode.declarations[ 0 ].id.name;
		}
		if ( node.parentNode ) {
			return Utils.recurseUpTree( node.parentNode );
		} else {
			return "";
		}
	};
} )( documentalCore.utils, documentalCore.state );

( function( Utils, State ) {

	Utils.postOrderTraverse = function ( node ) {

		if ( node.name ) {
			return node.name || node.property.name;
		} else {

			switch( node.type ) {
				case 'ThisExpression':
					return "this";
					break;
				case "Literal":
					return node.value;
					break;
				case "CallExpression":
					return Utils.postOrderTraverse( node.callee.object ) + "." + Utils.postOrderTraverse( node.callee.property );
				default:
					return Utils.postOrderTraverse( node.object ) + "." + Utils.postOrderTraverse( node.property );
					break;
			}


		}
	};
} )( documentalCore.utils, documentalCore.state );


























