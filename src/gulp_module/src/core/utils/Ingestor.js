/**
 * Created by ammanvedi on 25/01/2016.
 */

( function( Utils, State, config, acn, wlk ) {

	Utils.ingest = function() {

		if( process.argv.indexOf( "--ftp" ) > -1 ) {
			config.ftpCLI = true;
		}

		State.project = config && config.projectName ? config.projectName : "project";
		process.on('beforeExit', function(){
			if( !Utils.appBuilder.isBuilt() ) {
				Utils.exportDataToJSON();
			}
		});

		Utils.getReadme();

		return modify( {
			fileModifier: function ( file, contents ) {
				return Utils.determineFunctions(file,  contents, acn, wlk );
			}
		} );
	};

} )( documentalCore.utils, documentalCore.state, config, acorn, walk );