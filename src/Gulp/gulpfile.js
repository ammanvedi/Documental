var gulp = require('gulp');
var print = require('gulp-print');
var Documental = require('Documental');


//irb-web/widgets/mc-new/src/js/components/insights/MatchTeamsInAttackCard.js

//../../../irb-web/**/*.js
gulp.task('default', function () {
    gulp.src([ '../../../irb-web/widgets/mc-new/src/js/components/insights/MatchTeamsInAttackCard.js' ,'!../../../irb-web/tools/**', '!../../../irb-web/common/src/lib/3rd-party/**', '!../../../irb-web/**/**.min.js', '!../../../irb-web/storyboards/**'])
        .pipe(Documental.UTIL.ingest()).pipe(print(function(filepath) {
            return " Finished Parsing : " + filepath + " - ( Overall " + Documental.UTIL.getTotal() +" Methods, " + Math.floor(Documental.UTIL.getPercentDocumented()) +"% Documented) \n\n";
        }));
});