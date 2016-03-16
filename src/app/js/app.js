var app = angular.module( 'PulseDocs', [ 'ngRoute' ] );

app.config( [ '$routeProvider',
	function ( $routeProvider ) {
		$routeProvider.
			when( '/docs/:projectName', {
				templateUrl: 'partials/doc.html',
				controller: 'PulseDocController',
				reloadOnSearch: false
			} ).when( '/', {
				templateUrl: 'partials/homepage.html',
				controller: 'HomePageController'
			} )
	} ] );

