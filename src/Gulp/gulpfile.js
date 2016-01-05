var gulp = require('gulp');
var Documental = require( 'Documental' );

gulp.task('docs', function () {
    gulp.src([ 'test-projects/pulse-js/src/**/*.js']).pipe(Documental());
});