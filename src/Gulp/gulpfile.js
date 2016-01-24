var gulp = require('gulp');
var Documental = require( 'Documental' );

gulp.task('docs', function () {
    return gulp.src([ 'test-projects/premier-league-web/src/widgets/sites/pl/list-filter/js/filter-controller/**/*.js']).pipe(Documental());
});