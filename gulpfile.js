'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');
var markdown = require('markdown');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var ghPages = require('gulp-gh-pages');


var config = {
    production: !!util.env.production // check for --production flag
};

gulp.task('fileinclude', function(){

      gulp.src(['src/*.html'])
          .pipe(fileinclude({
              prefix: '@@',
              basepath: '@file',
              filters: {
                  markdown: markdown.parse
              }
          }))
          .pipe(gulp.dest('./dist'));

      gulp.src(['src/img/**/*.{png,jpg,jpeg,gif,webp,svg}'])
          .pipe(gulp.dest('./dist/img'));

      gulp.src(['src/fonts/**/*.*'])
          .pipe(gulp.dest('./dist/css/fonts'));

      gulp.src(['src/favicon/**/*.*'])
          .pipe(gulp.dest('./dist'));
});

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
          baseDir: './dist'
        }
    });

});

gulp.task('sass', function () {
  gulp.src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(config.production ? cssmin() : util.noop())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream())
    .pipe( notify({ message: "SASS tasks have been completed!"}) );
});

gulp.task('main-scripts', function(){
  return gulp
		.src([
      './js/!(_init)*.js', // all files that end in .js EXCEPT _init.js
      './js/_init.js' // include _init.js last
		])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('scripts.js'))
    .pipe(config.production ? uglify() : util.noop())
    .pipe(gulp.dest('./dist/js/'))
    .pipe( notify({ message: "scripts.js created"}) );
});

gulp.task('vendor-scripts', function() {
    return gulp
        .src([
            './bower_components/jquery/dist/jquery.js',
            './bower_components/jquery-tiny-pubsub/dist/ba-tiny-pubsub.js',
            './bower_components/slick-carousel/slick/slick.js',
            './js/vendor/*.js'
        ])
        .pipe(concat('plugins.js'))
        .pipe(config.production ? uglify() : util.noop())
        .pipe(gulp.dest('./dist/js/'))
        .pipe( notify({ message: "plugins.js created"}) );
});

gulp.task('watch', ['fileinclude'], function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.{png,jpg,jpeg,gif,webp,svg,html,md,woff,woff2,ico}', ['fileinclude']);
  gulp.watch('src/**/*.md', ['fileinclude']);
  gulp.watch('./js/**/*.js', ['main-scripts', 'vendor-scripts'])
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('build', ['main-scripts', 'vendor-scripts', 'sass', 'fileinclude', 'browser-sync']);
gulp.task('default', ['build', 'watch']);
