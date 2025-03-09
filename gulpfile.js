'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
require('dotenv').config(); // Loads variables from .env
console.log('Loaded API key:', process.env.GOOGLE_MAPS_API_KEY); // Log API key

// Compile SCSS to CSS
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ basename: 'styles.min' }))
        .pipe(gulp.dest('./css'));
});

// Watch changes in SCSS files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

// Minify JavaScript
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({ basename: 'scripts.min' }))
        .pipe(gulp.dest('./js'));
});

// Inject API key into index.template.html and generate index.html
gulp.task('inject-api-key', function () {
    return gulp.src('index.template.html')
        .pipe(replace('{{GOOGLE_MAPS_API_KEY}}', process.env.GOOGLE_MAPS_API_KEY))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

// Default task runs sass, minify-js, and inject-api-key
gulp.task('default', gulp.series('sass', 'minify-js', 'inject-api-key'));
