var app = angular.module( 'PulseDocs' );

app.directive( 'projectStatusList', function(){

	return{
		restrict: 'E',
		scope:{
			statuses: "="
		},
		link: function( scope, elem, attr )
		{

		}
	}

} )