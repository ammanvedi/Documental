var gulp = require('gulp');
var Documental = require( 'Documental' );

gulp.task('docs', function () {
    return gulp.src([ './node_modules/documental/src/**/*.js' ]).pipe(Documental());
});