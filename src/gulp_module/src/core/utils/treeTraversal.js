( function( Utils, State, cfg ) {


	/**
	 * recursively creates the menu tree, this function takes a initial tree and
	 * creates the object in place, The format of which conforms to that of
	 *
	 * @param {docNode} sourceObject documentation node which this recursion should handle
	 * @param {string} tree a var used to print a text representation of the menu
	 * @param {string} nodename name of the current node
	 * @param {Array.<menuNode>} menu empty or partial tree to add to in the recursion
	 * @param {string} workingpath current partial path ( namespace ) of the current item
	 */
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

	/**
	 * call recursive function to generate the menu tree from the source map, also sort the
	 * menu tree keys alphabetically.
	 * @returns {string} the stringified version of the tree for writing to file
	 */
	Utils.makeMenuTree = function () {
		Utils.recurseMenuTree( State.sourceMap, "", "", State.Tree, "" );
		State.Tree = [ State.Tree ];
		Utils.recursiveSortMenu( State.Tree );

		return JSON.stringify(  State.Tree  );
	};

} )( documentalCore.utils, documentalCore.state );


( function( Utils, State ) {

	/**
	 * recurse up the spidermonkey AST looking for additions to the namespace
	 *
	 * @param {spidermonkeyASTNode} node spidermonkey AST node
	 * @returns {string} the namespace that is build by recursing up the tree
	 */
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


	/**
	 * traverse the tree to pick up potential namespace. similar to Utils.recurseUpTree,
	 * without the use pf parents
	 *
	 * @param {spidermonkeyASTNode} node ast node to traverse
	 * @returns {string} namespace string found from traverse
	 */
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

( function( Utils, State ) {


	/**
	 * Take the menu tree and sort its keys alphabetically, apply this operation recursivley to any
	 * children of each menu item
	 *
	 * @param {Array.<menuNode>} menu the full menuu tree generated through recursion over sourcemap
	 */
	Utils.recursiveSortMenu = function ( menu ) {

		menu = menu.sort( function( a, b ) {

			if( a.text < b.text ) {
				return -1;
			}

			if( a.text > b.text ) {
				return 1;
			}

			return 0;

		} );

		menu.map( function( item ) {
			if( item.children && item.children.length ) {
				Utils.recursiveSortMenu( item.children )
			}
		} )

	};
} )( documentalCore.utils, documentalCore.state );

























