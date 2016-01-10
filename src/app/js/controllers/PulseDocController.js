var app = angular.module( 'PulseDocs' );

app.controller( 'PulseDocController', [ '$scope', '$routeParams', function ( $scope, $routeParams ) {
	// we control our app from here


	$scope.JSONDATA = {};
	$scope.nodeselected = {};
	$scope.documentationData = undefined;
	$scope.chosenpath = undefined;
	$scope.projectName = $routeParams.projectName;

	$.ajax( {
		dataType: "json",
		url: "data/" + $routeParams.projectName + "-sourcemap.json",
		success: function ( data ) {
			//console.log(data);
			$scope.JSONDATA = data;

		}
	} );

	$scope.$watch( 'chosenpath', function ( val ) {
		if( val && val.n  ) {
			$scope.check( val.n, true );
		}

	} );

	$scope.findObjByPath = function ( obj, path ) {

		if ( !path ) {
			return;
		}
		var parts = path.split( '.' ),
			rv,
			index;
		for ( rv = obj, index = 0; rv && index < parts.length; ++index ) {
			rv = rv[ parts[ index ] ];
		}
		return rv;
	}

	$scope.check = function ( path, fromsearch ) {

		var found = $scope.findObjByPath( $scope.JSONDATA, path );
		if ( found != undefined && found[ "Documentation" ] ) {
			var txt = JSON.stringify( found[ "Documentation" ], null, "    " );
			$scope.documentationData = found;
			$scope.documentationData.path = path;
			$scope.documentationData.title = path.split( "." )[ path.split( "." ).length-1 ];


			if ( !fromsearch ) {
				$scope.$apply();
			}

		}
	}


	$scope.jsonLocation = 'data/' + $scope.projectName +'-menuTree.json';

	//console.log("app is running");
} ] );
