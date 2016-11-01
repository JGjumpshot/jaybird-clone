var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var annotate = require('gulp-ng-annotate');


var paths = ['./app.js', './accessories/**/*.js','./cart/**/*.js', './directives/**/*.js', './home/**/*.js'];
var stylePath = ['./styles/**/*.scss'];

gulp.task('sass', function() {
  return gulp.src(stylePath)
  .pipe(sass())
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest('./public'));
});

gulp.task('js', function() {
  return gulp.src(paths)
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  .pipe(gulp.dest('./public'))
});

gulp.task('watch', function() {
  gulp.watch(paths, ['js']);
  gulp.watch(stylePath, ['sass']);
});

gulp.task('default', ['watch', 'js', 'sass']);
