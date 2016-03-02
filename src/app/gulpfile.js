var gulp = require('gulp');
var concat = require('gulp-concat');

var ftp = require('vinyl-ftp');
var fs = require('vinyl-fs');

var ftpConfig = require('./ftp.config.json');

gulp.task('scripts', function() {
	return gulp.src('./js/**/*.js')
		.pipe(concat('docapp.js'))
		.pipe(gulp.dest('./dist/js/'));
});


gulp.task('style', function() {
	return gulp.src('./style/**/*.css')
		.pipe(concat('docapp.css'))
		.pipe(gulp.dest('./dist/style/'));
});

gulp.task('html', function() {
	return gulp.src('./html/partials/*.html')
		.pipe(gulp.dest('./dist/partials/'));
});

gulp.task( 'deploy', function() {

	if( ftpConfig ) {

		var src;

		if( process.argv.indexOf( "--no-bower" ) === -1 ) {
			src = "./dist/**/*"
		} else {
			src = "./dist/!(vendor)*/*"
		}

		var conn = ftp.create( {
			host: ftpConfig.server,
			user: ftpConfig.username,
			password: ftpConfig.password,
			parallel: 10,
			log: console.log
		} );
		return gulp.src( src )
			.pipe( conn.newer( ftpConfig.location ) )
			.pipe( conn.dest( ftpConfig.location ) );
	}
} );

gulp.task('data', function() {
	return gulp.src('./data/*')
		.pipe(gulp.dest('./dist/data/'));
});

gulp.task('index', function() {
	return gulp.src('./html/index.html')
		.pipe(gulp.dest('./dist/'));
});

gulp.task('img', function() {
	return gulp.src('./img/**/*')
		.pipe(gulp.dest('./dist/img/'));
});

gulp.task( 'npm-build', function() {
	return gulp.src( [ './dist/**/*', '!./dist/vendor/**/*', '!./dist/data/**/*' ] )
		.pipe( gulp.dest( '../gulp_module/node_modules/documental/app/dist' ) )

} );

gulp.task( 'npm-build-data', function() {
	return gulp.src( [ './dist/data/data-goes-here.txt' ] )
		.pipe( gulp.dest( '../gulp_module/node_modules/documental/app/dist/data' ) )

} );

gulp.task( 'npm-move-bower', function() {
	return gulp.src( [ './bower.json', './.bowerrc' ] )
		.pipe( gulp.dest( '../gulp_module/node_modules/documental/app/' ) )
} );


gulp.task('default', [ 'scripts', 'style', 'html', 'index', 'data', 'img' ] );
gulp.task( 'build-dist', [ 'default', 'npm-build', 'npm-move-bower', 'npm-build-data' ] );
