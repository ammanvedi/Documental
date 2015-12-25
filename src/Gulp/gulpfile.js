var gulp = require('gulp');
var print = require('gulp-print');
var Documental = require('Documental');


gulp.task('docs', function () {
    gulp.src([ '../../../pulse-js/src/**/*.js'])
        .pipe(Documental.UTIL.ingest("pulse-js"))
        .on( 'finish', function(){ Documental.UTIL.exportDataToJSON();});
});