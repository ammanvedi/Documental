var gulp = require('gulp');
var print = require('gulp-print');
var Documental = require('Documental' ).Documental;


gulp.task('docs', function () {
    gulp.src([ '../../../pulse-js/src/**/*.js'])
        .pipe(Documental.utilities.ingest("pulse-js"))
        .on( 'finish', function(){ Documental.utilities.exportDataToJSON();});
});