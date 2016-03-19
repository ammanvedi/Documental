

( function( Utils, State, config, fs, mkd ) {

	/**
	 * attempt to get the readme file and if successful then parse it
	 */
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

	/**
	 * take md text from file and attempt to generate html from it, then write the file
	 *
	 * @param {string} data markdown text from file
	 */
	Utils.parseReadme = function( data ) {

		try{

			var md = mkd( data );
			Utils.writeReadme( md );

		}catch ( e ) {
			Utils.logError( "Readme Helper : couldnt parse markdown from " + config.readme );
			Utils.generateReadme();
		}
	};

	/**
	 * Write the readme to the local app directory
	 *
	 * @param {string} html markup string representing readme contents
	 */
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

	/**
	 * TODO - implement placeholder readme
	 */
	Utils.generateReadme = function() {

		Utils.logError( 'Generating placeholder readme ' );
	};


} )( documentalCore.utils, documentalCore.state, config, fs, marked );