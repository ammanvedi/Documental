var app = angular.module( 'PulseDocs' );

app.directive( 'projectStatusList', function(){

	return{
		restrict: 'E',
		scope:{
			statuses: "="
		},
		link: function( scope, elem, attr )
		{
			scope.$watch('statuses', function(newValue, oldValue) {
				console.log( newValue, oldValue )
			});
		},
		templateUrl: "partials/projectstatuslist.html"
	}

} );