
( function( Utils, State, Config, vftp, fs, map, Gfile, del ) {

	Utils.ftp = {};

	/**
	 * initiate the ftp process, entering this function will check if ftp is enabled
	 * and if so initiate the upload
	 *
	 * @param {Array.<string>} files list of files which should be uploaded
	 */
	Utils.ftp.initiate = function( files ) {

		var requiredProps = [ "server", "location", "username", "password" ];

		if( Config.ftp && !Utils.general.checkProperties( Config.ftp, requiredProps ) ) {

			Utils.logStage( "Getting FTP INFO" );

			if( Config.ftpAuto || Config.ftpCLI ) {
				Utils.ftp.upload( files );
			}

		} else {
			Utils.logError( " FTP info specified is invalid" );
		}
	};

	/**
	 * upload ftp file, can be used to upload source files ( provide file param )
	 * or provide glob in order to upload projects.json
	 * TODO - this function needs to be more general
	 *
	 * @param {Array.<string>|boolean} files files to upload
	 * @param {Array.<string>} [glob] location of the doc.proj.json
	 */
	Utils.ftp.upload = function( files, glob ) {

		Utils.logStage( "Uploading to FTP Location.." );

		var conn = new vftp( {
			host: Config.ftp.server,
			user: Config.ftp.username,
			password: Config.ftp.password,
			parallel: 10,
			log: console.log

		} );


		if( files ) {
			fs.src( files.slice( 0, 4 ), { buffer: false } ).pipe( conn.dest( Config.ftp.location ) );
			fs.src( files.slice( 3, 4 ), { buffer: false } ).pipe( conn.dest( Config.ftp.htmlLocation ) );

			Utils.ftp.checkProjectConfig( conn );
		}

		if( glob ) {
			fs.src( glob, { buffer: false } )
				.pipe( conn.dest( Config.ftp.location ) )
				.on( "end", function() {
					del( [ "./documental.projects.json" ] );
				} );
		}


	};

	/**
	 * check the documental.projects.json on the server and determine if an update is
	 * needed
	 *
	 * @param {object} connection the ftp connection that has already been established
	 */
	Utils.ftp.checkProjectConfig = function( connection ) {
		connection.src( Config.ftp.location + "/documental.projects.json" ).pipe( map( function( file, cb ) {

			var projects;

			try {

				projects = JSON.parse( file.contents.toString() );

				Utils.logStage( "Got remote projects config. Updating..." );
				Utils.ftp.updateProjectConfig( connection, projects );


			} catch ( e ) {

				Utils.logError( "Failed parsing remote projects config ! creating fresh config..." );
				Utils.ftp.updateProjectConfig( connection, [] );

			}

			cb( null, file );

		} ) );
	};

	/**
	 * check the projects array for needed updates
	 *
	 * @param {object} connection the ftp connection that has already been established
	 * @param {Array.<object>} projects project information
	 */
	Utils.ftp.updateProjectConfig = function( connection, projects ) {

		var needsUpdate = true;

		try {

			projects.map( function( p ) {
				if( p.projectName === Config.projectName ) {
					Utils.logStage( "Project present in config, no need to update" );
					needsUpdate = false;
				}
			} );

			if( needsUpdate ) {
				projects.push( {
					projectName: Config.projectName
				} );
				Utils.logStage( "Updated Project Config" );

				Gfile('documental.projects.json', JSON.stringify( projects ), { src: true })
					.pipe(gulp.dest('./') )
					.on( "end", function() {
						Utils.ftp.upload( false, [ './documental.projects.json' ] );
					} );

			}



		} catch ( e ) {
			Utils.logError( "Failed updating remote projects config ! creating fresh config..." );
			Utils.ftp.createProjectConfig( connection );
		}


	};

	Utils.ftp.createProjectConfig = function( connection ) {

	}

} )( documentalCore.utils, documentalCore.state, config, vftp, vfs, map, file, del );