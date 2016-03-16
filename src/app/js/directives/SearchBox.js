var app = angular.module( 'PulseDocs' );

app.directive( 'searchBox', function () {
	return {
		restrict: 'E',
		scope: {
			pickedresult: '=',
			projname: "="

		},
		link: function ( scope, element, attr ) {

			scope.methods = {};

			console.log("SS", scope);

			$.ajax( {
				dataType: "json",
				url: "data/" + scope.projname + "-autocomplete.json",
				success: function ( data ) {
					console.log( "ataaaaa", data );
					scope.methods = data;

					$( '.ui.search' )
						.search( {
							source: data,
							searchFields: [
								'n'
							],
							fields: {
								'description': 'n',
								'title': 't'
							},
							searchFullText: true,
							maxResults: 10,
							onResultsAdd: function ( html ) {
								//console.log(html);
							},
							onResults: function ( res ) {
								//console.log( "res, ", res  );
							},
							onSelect: function ( result, response ) {
								//console.log(  'select : ', result, response);
								scope.pickedresult = result;
								scope.$apply();
							}
						} )
					;

				}
			} );

		},
		templateUrl: 'partials/searchbox.html'
	}
} )