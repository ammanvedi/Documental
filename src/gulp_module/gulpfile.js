var gulp = require('gulp');
var Documental = require( 'Documental' );

gulp.task('docs', function () {
    return gulp.src([ './test-projects/icc-web/widgets/**/*.js' ]).pipe(Documental());
});