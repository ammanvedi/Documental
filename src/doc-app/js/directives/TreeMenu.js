var app = angular.module( 'PulseDocs' );

app.directive( 'menuTree', function () {

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

			}

			scope.$watch( 'opensearchres', function ( val ) {
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

				scope.easytree.rebuildTree();
				scope.scrollToNode( destinationnodeid );


			} )

			$( '.sidebar' ).sidebar( {
				context: $( '#PulseDocController' ),
				dimPage: false,
				transition: 'push',
				closable: false,
			} )
			;


			$( "body" ).on( "click", "li", function ( event ) {
				var path = $( this ).data( path );


				if ( path.path !== undefined ) {
					//console.log(path);

					scope.selectval = path;
					scope.updateselected( path );
					//console.log(scope);
				}

				event.preventDefault();
				event.stopPropagation();
			} );


			scope.easytree = $( '#sidebar', $( element ) ).easytree( {
				dataUrl: scope.jsonurl,
			} );
			//console.log(scope);
		},
		templateUrl: 'partials/menutree.html'
	}

} );