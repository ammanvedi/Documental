var gulp = require( 'gulp' );
var Documental = require( 'Documental' );

gulp.task('docs', function () {
    return gulp.src([ './gulp_module/src/**/*.js' ]).pipe(Documental());
});gulp