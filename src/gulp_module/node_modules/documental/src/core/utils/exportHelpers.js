/**
 * Created by ammanvedi on 25/01/2016.
 */


( function( Utils, State, config ) {

	Utils.exportDataToJSON = function () {

		var outputs = [];

		if( config.jsonOutput ) {
			outputs.push( process.cwd() + '/' + config.jsonOutput  );
		}

		//var outPath = config && config.jsonOutput && !config.useApp ? process.cwd() + '/' + config.jsonOutput  : process.cwd() + '/';
		//var outPath = config && config.jsonOutput && !config.useApp ? process.cwd() + '/' + config.jsonOutput  : State.docAppPath;

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