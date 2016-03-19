
( function( Utils, State, config, acn, wlk ) {

	/**
	 * This is the main entry point to the documentation generation, this
	 * is what we export as out module / what is invoked on a Documental() call
	 * here we;
	 *
	 * 1) check if the user wants to FTP files, and set the config accordingly
	 * 2) check if the user wants to use the app, and set the call to build it on
	 * 		end of processing if so
	 * 3) attempt to find a readme
	 * 4) determine the functions in the file
	 *
	 * @returns {stream} return a gulp stream
	 */
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