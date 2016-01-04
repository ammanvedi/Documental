var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
	return gulp.src('./js/**/*.js')
		.pipe(concat('docapp.js'))
		.pipe(gulp.dest('./dist/js/'));
});


gulp.task('style', function() {
	return gulp.src('./style/**/*.css')
		.pipe(concat('docapp.css'))
		.pipe(gulp.dest('./dist/style/'));
});

gulp.task('html', function() {
	gulp.src('./html/partials/*.html')
		.pipe(gulp.dest('./dist/partials/'));
});


gulp.task('data', function() {
	gulp.src('./data/*.json')
		.pipe(gulp.dest('./dist/data/'));
});

gulp.task('index', function() {
	gulp.src('./html/index.html')
		.pipe(gulp.dest('./dist/'));
});

gulp.task('img', function() {
	gulp.src('./img/**/*')
		.pipe(gulp.dest('./dist/img/'));
});


gulp.task('default', [ 'scripts', 'style', 'html', 'index', 'data', 'img' ] );