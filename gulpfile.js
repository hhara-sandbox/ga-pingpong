var gulp = require('gulp');
var path = require('path');

var webserver = require('gulp-webserver');

/*------------------------------------------------------------------
    ローカルサーバ
------------------------------------------------------------------*/
gulp.task('webserver', function() {

    gulp
        .src('./')
        .pipe(webserver({
            livereload: true,
            port: 8001,
            fallback: 'index.html',
            open: true
        }))
    ;

});

/*------------------------------------------------------------------
    default
------------------------------------------------------------------*/
gulp.task('default', ['webserver']);