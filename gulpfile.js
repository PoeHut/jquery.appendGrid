// Load required modules
var gulp = require('gulp'),
    copy = require('gulp-copy'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    saveLicense = require('uglify-save-license'),
    fs = require('fs'),
    del = require('del');

// Read package.json
// var json = JSON.parse(fs.readFileSync('./package.json'));

// Clean the dist folder
gulp.task('clean', function () {
    return del(['dist/**/*']);
});

// CSS for Bootstrap 4
gulp.task('css_bs4', ['clean'], function () {
    return gulp.src(['src/css/ag.core.js', 'src/css/ag.bootstrap4.css'])
        .pipe(concat('jquery.appendGrid-bs4.css'))
        .pipe(gulp.dest('dist'));
});

// Copy bs4 as main css
gulp.task('css_copy_as_main', ['css_bs4'], function () {
    return gulp.src('dist/jquery.appendGrid-bs4.css')
        .pipe(rename('jquery.appendGrid.css'))
        .pipe(gulp.dest('dist'));
});

// CSS minify
gulp.task('csso', ['css_bs4', 'css_copy_as_main'], function () {
    return gulp.src('dist/*.css')
        .pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

// JS for Bootstrap 4 + Font Awesome 5
gulp.task('js_bs4_fa5', ['clean'], function (cb) {
    return gulp.src(['src/js/ag.core.js', 'src/js/ag.bootstrap4.js', 'src/js/ag.bootstrap4_fontawesome5.js'])
        .pipe(concat('jquery.appendGrid-bs4_fa5.js'))
        .pipe(gulp.dest('dist'));
});

// Copy bs4_fa5 as main js
gulp.task('js_copy_as_main', ['js_bs4_fa5'], function (cb) {
    return gulp.src('dist/jquery.appendGrid-bs4_fa5.js')
        .pipe(rename('jquery.appendGrid.js'))
        .pipe(gulp.dest('dist'));
});

// JS minify
gulp.task('uglify', ['js_bs4_fa5', 'js_copy_as_main'], function (cb) {
    return gulp.src('dist/*.js')
        .pipe(uglify({
            output: {
                comments: saveLicense
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

// The main task
gulp.task('default', ['clean', 'css_bs4', 'css_copy_as_main', 'csso', 'js_bs4_fa5', 'js_copy_as_main', 'uglify']);