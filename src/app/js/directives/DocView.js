var app = angular.module( "PulseDocs" );

app.directive( "docView", function () {


	return {
		restrict: 'E',
		scope: {
			docstructure: '='
		},
		link: function ( scope, element, attribute ) {




			scope.$watch( 'docstructure', function ( obj ) {
				if( scope.docstructure && scope.docstructure.Source ) {
					console.log( 'docview observed change : ', scope );
					$('pre code' ).text(scope.docstructure.Source);
					hljs.highlightBlock($('pre code')[0]);
				}


			}, true );
		},
		templateUrl: 'partials/docview.html',
		controller: 'PulseDocController'
	}

} );