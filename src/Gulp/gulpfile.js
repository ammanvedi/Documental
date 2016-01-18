var gulp = require('gulp');
var Documental = require( 'Documental' );

gulp.task('docs', function () {
    return gulp.src([ 'test-projects/premier-league-web/src/**/*.js']).pipe(Documental());
});