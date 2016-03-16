var gulp = require('gulp');
var concat = require('gulp-concat');
var ftp = require('vinyl-ftp');
var fs = require('vinyl-fs');

var ftpConfig = require('./ftp.config.json');

var config = {
  app: {
      src: {
          root: "./app/",
          js: [ "./app/js/**/*.js" ],
          css: [ "./app/style/**/*.css" ],
          img: [ "./app/img/**/*" ],
          html: [ "./app/html/partials/*.html" ],
          data: [ "./app/data/*" ]
      },
      dist: {
          root: "./app/dist/",
          js: "./app/dist/js/" ,
          css:  "./app/dist/style/" ,
          img: "./app/dist/img" ,
          html:  "./app/dist/partials/" ,
          data:  "./app/dist/data/" ,
          npmRoot: "./node_modules/documental/",
          npm:  './node_modules/documental/app/dist/'
      }
  },
  node: {
      src: {
          root: "/gulp_module/src",
          js: [
              './gulp_module/src/core/core.js',
              './gulp_module/src/core/utils/**/*.js',
              './gulp_module/src/core/appBuilder/**/*.js',
              './gulp_module/src/parser/plugins/**/*.js',
              './gulp_module/src/parser/parser.js',
              './gulp_module/src/core/exports.js'
          ],
          meta: [ "./package.json", "../README.md" ]
      },
      dist: {
          root: "./node_modules/documental/",
          js: "./node_modules/documental/"
      }

  }

};


gulp.task('scripts', function() {
    return gulp.src(config.app.src.js)
        .pipe(concat('docapp.js'))
        .pipe(gulp.dest(config.app.dist.js));
});


gulp.task('style', function() {
    return gulp.src( config.app.src.css )
        .pipe(concat('docapp.css'))
        .pipe(gulp.dest( config.app.dist.css ));
});

gulp.task('html', function() {
    return gulp.src( config.app.src.html )
        .pipe(gulp.dest( config.app.dist.html ));
});

gulp.task( 'deploy', function() {

    if( ftpConfig ) {

        var src;

        if( process.argv.indexOf( "--no-bower" ) === -1 ) {
            src = [ config.app.dist.root + "**/*", config.app.dist.root + "index.html" ]
        } else {
            src = [ config.app.dist.root + "!(vendor)*/*", config.app.dist.root + "index.html" ]
        }

        var conn = ftp.create( {
            host: ftpConfig.server,
            user: ftpConfig.username,
            password: ftpConfig.password,
            parallel: 10,
            log: console.log
        } );
        return gulp.src( src )
            .pipe( conn.newer( ftpConfig.location ) )
            .pipe( conn.dest( ftpConfig.location ) );
    }
} );

gulp.task('data', function() {
    return gulp.src( config.app.src.data )
        .pipe(gulp.dest( config.app.dist.data ));
});

gulp.task('index', function() {
    return gulp.src( config.app.src.root + 'html/index.html')
        .pipe(gulp.dest( config.app.dist.root ));
});

gulp.task('img', function() {
    return gulp.src( config.app.src.img )
        .pipe(gulp.dest( config.app.dist.img ));
});

gulp.task( 'npm-build', function() {
    return gulp.src( [ config.app.dist.root + '**/*', '!' + config.app.dist.root + 'vendor/**/*', '!' + config.app.dist.root + 'data/**/*' ] )
        .pipe( gulp.dest( config.app.dist.npm ) )

} );

gulp.task( 'npm-build-data', function() {
    return gulp.src( [ config.app.dist.data + 'data-goes-here.txt' ] )
        .pipe( gulp.dest( config.app.dist.npm + 'data' ) )

} );

gulp.task( 'npm-build-data-dirty', function() {
    return gulp.src( [ config.app.dist.data + '**/*' ] )
        .pipe( gulp.dest( config.app.dist.npm + 'data' ) )

} );

gulp.task( 'npm-move-bower', function() {
    return gulp.src( [ config.app.src.root + 'bower.json', config.app.src.root + '.bowerrc' ] )
        .pipe( gulp.dest( config.app.dist.npmRoot + "app/" ) )
} );

gulp.task('build-module', [ 'build-module-meta' ], function() {

    return gulp.src( config.node.src.js )
        .pipe(concat('index.js'))
        .pipe(gulp.dest( config.node.dist.js ));
});

gulp.task('build-module-meta', function() {

    return gulp.src( config.node.src.meta )
        .pipe(gulp.dest( config.node.dist.root ));
});


gulp.task('app-default', [ 'scripts', 'style', 'html', 'index', 'data', 'img' ] );
gulp.task( 'build-app-dist', [ 'app-default', 'npm-build', 'npm-move-bower', 'npm-build-data-dirty' ] );

gulp.task( 'build-npm', [ 'build-module', 'build-app-dist' ] );

