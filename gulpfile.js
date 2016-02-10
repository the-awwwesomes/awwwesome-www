var gulp = require('gulp');

var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var inject = require('gulp-inject');
var revAll = require('gulp-rev-all');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var autoprefixer = require('autoprefixer');
var bowerFiles = require('main-bower-files');

/*
  Development settings
*/
gulp.task('serve:dev', ['inject:dev', 'connect:dev', 'watch:dev']);

gulp.task('inject:dev', function () {
  var target = gulp.src('index.html');
  var sources = gulp.src([
    './dev/js/**/*.js', 
    './dev/css/**/*.css'
  ], { read: false });

  return target.pipe(inject(sources))
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest('.'));
});

gulp.task('connect:dev', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('watch:dev', function() {
  gulp.watch(['index.html'], ['html']);
  gulp.watch(['./dev/css/**/*.css'], ['css']);
  gulp.watch(['./dev/js/**/*.js'], ['js']);
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./dev/css/**/*.css')
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./dev/css/**/*.js')
    .pipe(connect.reload());
});

/*
  Production settings
*/
gulp.task('css:dist', function () {
  console.log(revAll)
  gulp.src([
    './dev/css/normalize.css',
    './dev/css/main.css' 
    ])
    .pipe(concat('bundle.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(revAll.revision())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('inject:dist', function () {
  var target = gulp.src('index.html');
  var sources = gulp.src([
    './dev/js/**/*.js', 
    './dev/css/**/*.css'
  ], { read: false });

  return target.pipe(inject(sources))
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest('.'));
});

// For testing production code locally
gulp.task('serve:dist', function() {

});

gulp.task('bundle', function() {

});