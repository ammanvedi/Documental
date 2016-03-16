var app = angular.module( 'PulseDocs' );

app.directive( 'menuTree', [ "$location", function ( $location ) {

	return {
		restrict: 'E',
		scope: {
			jsonurl: '@',
			updateselected: '&',
			opensearchres: '='
		},
		link: function ( scope, element, attrs ) {

			scope.scrollToNode = function ( nodeid ) {

				$('#' + nodeid).offset().top - $(".easytree-container").offset().top

			};

			scope.$watch( 'opensearchres', function ( val ) {
				if( val && val.n ) {
					console.log( 'menutree should update path', val );
					var destinationnodeid = $( '[data-path="' + val.n + '"] > span' ).attr( 'id' );
					//var node = scope.easytree.getNode( nodeid );
					//node.isExpanded = true;
					scope.easytree.activateNode( destinationnodeid );
					//scope.easytree.rebuildTree();

					var pathtonode = val.n.split( '.' );
					var collectpath = "";

					for ( var i = 0; i < pathtonode.length; i++ ) {

						collectpath += pathtonode[ i ];
						console.log( collectpath );
						var nodeid = $( '[data-path="' + collectpath + '"] > span' ).attr( 'id' );
						var node = scope.easytree.getNode( nodeid );
						node.isExpanded = true;
						collectpath += "."


					}

					$location.hash( val.n );
					scope.getIdPath( val.n );

					scope.easytree.rebuildTree();
					scope.scrollToNode( destinationnodeid );
				}

			} )

			$( '.sidebar' ).sidebar( {
				context: $( '#PulseDocController' ),
				dimPage: false,
				transition: 'push',
				closable: false
			} )
			;


			$( "body" ).on( "click", "li", function ( event ) {

				var path = $( this ).data( path );
				if ( path.path !== undefined ) {
					//console.log(path);
					scope.selectval = path;
					scope.updateselected( path );
					$location.hash( path.path );
					scope.$apply();
					//console.log(scope);
				}
				event.preventDefault();
				event.stopPropagation();
			} );

			scope.getIdPath = function( path ) {

				var domNode = $( "body li[data-path=\'" + path + "\']" );
				var path = domNode.parents( ":has(> span[id^='_st_node_'])" );

				return path.map( function( el ) {

					var id = $( path[ el]  ).children()[0].getAttribute( "id" );
					console.log( id );
					if( !scope.easytree.getNode( id ).isExpanded ) {
						scope.easytree.toggleNode( id );
					}

					return  id;
				} )

			};

			scope.easytree = $( '#sidebar', $( element ) ).easytree( {
				dataUrl: scope.jsonurl,
				built: function() {
					if( $location.hash() ) {

						var el = $( "body li[data-path=\'" + $location.hash() + "\']" )
						var node = scope.easytree.getNode( $( "span", el )[ 0 ].getAttribute( "id" ) );
						scope.easytree.activateNode( $( "span", el )[ 0 ].getAttribute( "id" ) );

						console.log( 'el', el, scope.getIdPath( $location.hash() ) );
						el.click();
					}
				}
			} );


			//console.log(scope);
		},
		templateUrl: 'partials/menutree.html'
	}

} ] );