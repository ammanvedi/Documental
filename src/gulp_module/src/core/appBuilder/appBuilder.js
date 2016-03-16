/**
 * Created by ammanvedi on 25/01/2016.
 */


( function( Utils, State, cfg) {

	Utils.appBuilder = ( function( g, shell, bs, opn, rs ) {

		var builder = {};

		var built = false;


		builder.build = function( serverRoot, projectName, port ) {

			g.task( 'bower-install', shell.task( 'bower install', { cwd: "./node_modules/documental/app" } ));

			g.task( 'make-browser', function() {

				bs.init({ server: {
					baseDir: serverRoot
					},
					open : false,
					port: port
				});

			} );

			g.task("open-site", function(){
				var options = {
					url: "http://localhost:" + port + "/#/docs/" + projectName,
					app: "chrome"
				};
				Utils.logStage( "App launched..." );
				Utils.logInfo( 'opening...' );
				opn.open( options.url );
			});


			g.task( 'build-site', function() {

				Utils.logStage( "Running app build tasks" );
				rs('bower-install', 'make-browser', 'open-site' );


			} );

			g.start( 'build-site' );
			built = true;
		};

		builder.isBuilt = function() {
			return built;
		};

		return builder;

	} )( gulp, shell, browserSync, open, runSequence );

} )( documentalCore.utils, documentalCore.state, config );