/**
 * Created by ammanvedi on 05/02/2016.
 */


var app = angular.module( "PulseDocs" );

app.directive( "readmeDisplay", [ '$http', '$routeParams',  function( $http, $routeParams ) {

	return {
		scope: {
			docstructure: "="
		},
		restrict: "E",
		link: function( scope, elem, attr ) {



			console.log( elem, attr );

			console.log( 'did init readme display' );

			$http({
				method: 'GET',
				url: 'partials/' + $routeParams.projectName + "-readmePartial.html"
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available

				//console.log( 'got data', response );
				//elem.html( response.data );

				$http({
					method: 'GET',
					url: 'partials/readmeHeader.html'
				}).then(function successCallback(headerresponse) {
					// this callback will be called asynchronously
					// when the response is available

					console.log( 'got data', response );
					elem.html( headerresponse.data + response.data );

				}, function errorCallback(headerresponse) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log( 'getfail', response );

				});

			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.log( 'getfail', response );

			});

			scope.$watch( 'docstructure', function ( obj ) {

				$('.cookie.nag')
					.nag('show')
				;

				if( !scope.docstructure ) {
					console.log( "NO DOCS DATA" );
					elem.show();
				} else {
					elem.hide();
				}

			}, true );



		}
	}

} ] );