app = angular.module( 'PulseDocs' );

app.controller( 'HomePageController', [ '$scope', 'docDataService', function( $scope, dataService ){

	$scope.statusList = {};

} ] );