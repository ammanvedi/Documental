var app = angular.module( 'PulseDocs' );

app.factory( 'docDataService', function() {

	return (function(){

		var projectsConfigPath = 'data/documental.projects.json';
		var configData = false;

		var DataServices = {};

		DataServices.testprivate = function()
		{
			console.log(privatevar);
		}

		DataServices.getProjectsConfig = function( callback ) {

			if( configData )
			{
				callback( configData );
				return;
			}

			$.ajax( {
				dataType: "json",
				url: projectsConfigPath,
				success: function( data ) {
					configData = data;
					callback( data );
				}

			} );

		}

		return DataServices;

	})();

} );