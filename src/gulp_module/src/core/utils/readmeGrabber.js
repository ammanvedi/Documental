

( function( Utils, State, config, fs, mkd ) {



	Utils.getReadme = function() {
		var _self = this;

		Utils.logStage( 'Getting readme' );
		if( config && config.readme ) {
			fs.readFile( config.readme, 'utf8', function( e, d ) {
				if( !e ) {
					Utils.logInfo( 'Got readme' );
					Utils.parseReadme( d );

				} else {
					Utils.logError( "Couldnt get readme " );
					Utils.generateReadme();
				}

			});
		}
	};


	Utils.parseReadme = function( data ) {

		try{

			var md = mkd( data );
			Utils.writeReadme( md );

		}catch ( e ) {
			Utils.logError( "Readme Helper : couldnt parse markdown from " + config.readme );
			Utils.generateReadme();
		}
	};

	Utils.writeReadme = function( html ) {

		Utils.logStage( 'Writing readme' );
		var path = "./node_modules/documental/app/dist/partials/" + config.projectName + "-readmePartial.html";

		fs.writeFile( path, html, "utf8", function( err ) {
			if( err ) {
				Utils.logError( "Readme Helper : couldn't place file " +  path );
				Utils.generateReadme();
			} else {
				Utils.logInfo( "wrote readme as html" );
			}

		});

	};

	Utils.generateReadme = function() {

		Utils.logError( 'Generating placeholder readme ' );

	};


} )( documentalCore.utils, documentalCore.state, config, fs, marked );