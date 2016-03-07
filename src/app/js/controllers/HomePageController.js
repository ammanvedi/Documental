app = angular.module( 'PulseDocs' );

app.controller( 'HomePageController', [ '$scope', 'docDataService', function( $scope, docDataService ){

	$scope.statusList = {};
	docDataService.getProjectsConfig( function( config ) {
		$scope.statusList = config;
	} );

} ] );