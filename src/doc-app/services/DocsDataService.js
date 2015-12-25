var app = angular.module( 'PulseDocs' );

app.factory( 'docDataService', function() {

	return (function(){

		var privatevar = "ssssss";
		var projectsConfigPath = 'data/documental.projects.json';
		var configData = false;

		var DataServices = {}

		DataServices.testprivate = function()
		{
			console.log(privatevar);
		}

		DataServices.getRepoInfo = function( callbqck )
		{
			DataServices.getProjectsConfig( function( data ) {

				//we have project info, build a githubbitbucket url and make the request

			} );
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