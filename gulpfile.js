// require

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
// var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wait = require('gulp-wait');

//sources and destinations

var sassSource = 'src/sass/*.scss';
var jsSource = 'src/js/*.js';
var htmlSource = 'app/*.html';
var oldcssSource = 'src/css-old/*.css';
var css = 'app/css';

// tasks
gulp.task('sassCompile', function () {
    return gulp.src(sassSource)
        .pipe(wait(100))
        .pipe(sourcemaps.init())
        .pipe(sass({
                outputStyle: 'expanded'
            })
            .on('error', sass.logError))
        .pipe(autoprefixer('last 10 versions'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(css))
        .pipe(connect.reload());
})

gulp.task('js', function () {
    gulp.src(jsSource)
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(connect.reload())
});
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});
gulp.task('html', function () {
    gulp.src(htmlSource)
        .pipe(connect.reload())
});

//watch

gulp.task('watch', function () {
    gulp.watch(jsSource, ['js']);
    gulp.watch(sassSource, ['sassCompile']);
    gulp.watch(htmlSource, ['html']);
});

//default

gulp.task('default', ['sassCompile', 'watch', 'connect']);