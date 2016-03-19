
( function( Utils, State, config ) {

	/**
	 * export JSON data files to json
	 */
	Utils.exportDataToJSON = function () {

		var outputs = [];

		if( config.jsonOutput ) {
			outputs.push( process.cwd() + '/' + config.jsonOutput  );
		}

		if( config.useApp ) {
			outputs.push( State.docAppPath );
			Utils.appBuilder.build( "./node_modules/documental/app/dist", Utils.getProjectName(), config.port || 3000 );
		}

		var files;

		outputs.map( function( outPath ) {
			files = [
				outPath + Utils.getProjectName() + '-menuTree.json',
				outPath + Utils.getProjectName() + '-sourcemap.json',
				outPath + Utils.getProjectName() + '-autocomplete.json',
				"./node_modules/documental/app/dist/partials/" + config.projectName + "-readmePartial.html"

			];

			fs.writeFileSync( files[ 0 ], Utils.makeMenuTree() );
			fs.writeFileSync( files[ 1 ], Utils.getSourceMap() );
			fs.writeFileSync( files[ 2 ], Utils.getAutocomplete() );
		} );

		Utils.ftp.initiate( files );

	};

} )( documentalCore.utils, documentalCore.state, config );