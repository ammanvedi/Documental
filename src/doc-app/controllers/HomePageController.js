app = angular.module( 'PulseDocs' );

app.controller( 'HomePageController', [ '$scope', 'docDataService', function( $scope, dataService ){

	$scope.statusList = {};

	dataService.testprivate();
	dataService.getProjectsConfig(function(data){
		console.log(data);
	});

	console.log("ajajajaja");

} ] );