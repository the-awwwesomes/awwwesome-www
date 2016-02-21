var gulp = require('gulp');

var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var inject = require('gulp-inject');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var autoprefixer = require('autoprefixer');
var bowerFiles = require('main-bower-files');

/*
  Development settings
*/
gulp.task('serve:dev', ['inject:dev', 'connect', 'watch:dev']);

gulp.task('inject:dev', function () {
  var target = gulp.src('index.html');
  var sources = gulp.src([
    './dev/js/**/*.js', 
    './dev/css/normalize.css',
    './dev/css/base.css',
    './dev/css/main.css',
    './dev/css/morphing-btn.css',
    './dev/css/mailchimp-form.css'
  ], { read: false });

  return target.pipe(inject(sources))
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest('.'));
});

gulp.task('connect', function () {
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
  gulp.src([
    './dev/css/normalize.css',
    './dev/css/base.css',
    './dev/css/main.css',
    './dev/css/morphing-btn.css',
    './dev/css/mailchimp-form.css'
    ])
    .pipe(concat('bundle.css'))
    .pipe(cssmin())
    .pipe(rev())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('css:vendor:dist', function () {
  gulp.src('./bower_components/**/*.css')
    .pipe(concat('vendor.css'))
    .pipe(cssmin())
    .pipe(rev())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js:dist', function () {
  gulp.src([
    './dev/js/plugins.js',
    './dev/js/main.js' 
    ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js:vendor:dist', function () {
  gulp.src('./bower_components/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(cssmin())
    .pipe(rev())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('inject:dist', function () {
  var target = gulp.src('index.html');
  var sources = gulp.src([
    './dist/js/**/*.js', 
    './dist/css/**/*.css'
  ], { read: false });

  return target.pipe(inject(sources))
    .pipe(gulp.dest('.'));
});

gulp.task('clean:css', function () {
  return gulp.src('./dist/css', {read: false})
    .pipe(clean());
});

gulp.task('clean:js', function () {
  return gulp.src('./dist/js', {read: false})
    .pipe(clean());
});

gulp.task('bundle', ['clean:css', 'clean:js', 
  'css:dist', 'css:vendor:dist', 
  'js:dist', 'js:vendor:dist', 
  'inject:dist']);

// For testing production code locally
gulp.task('serve:dist', ['bundle', 'connect']);
