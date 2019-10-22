const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const imagemin = require('gulp-imagemin');

gulp.task('sass-compile', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
});

gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'))
});


gulp.task('compress', function() {
    gulp.src('./assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/imageMin'))
});