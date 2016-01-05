var gulp = require('gulp');
var Documental = require( 'Documental' );

gulp.task('docs', function () {
    return gulp.src([ 'test-projects/pulse-js/src/**/*.js']).pipe(Documental());
});