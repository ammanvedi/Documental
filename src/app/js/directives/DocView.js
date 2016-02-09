var app = angular.module( "PulseDocs" );

app.directive( "docView", [ 'typeParserService', function ( typeParserService ) {


	return {
		restrict: 'E',
		scope: {
			docstructure: '='
		},
		link: function ( scope, element, attribute ) {

			scope.parseType = typeParserService;

			scope.$watch( 'docstructure', function ( obj ) {
				if( scope.docstructure && scope.docstructure.Source ) {
					console.log( 'docview observed change : ', scope );
					$('pre code' ).text(scope.docstructure.Source);
					//hljs.highlightBlock($('pre code')[0]);
					Prism.highlightElement($('pre code')[0], true, function(){})
				} else {
					console.log( "NO DOCS DATA" );
				}

				if( !scope.docstructure ) {
					console.log( "NO DOCS DATA" );
					element.hide();
				} else {
					console.log( 'view has docs data', scope.docstructure );
					element.show();
				}

			}, true );

			if( !scope.docstructure ) {
				console.log( "NO DOCS DATA" );
			}

		},
		templateUrl: 'partials/docview.html',
		controller: 'PulseDocController'
	}

}  ] );