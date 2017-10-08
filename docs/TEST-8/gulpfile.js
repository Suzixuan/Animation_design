
var gulp = require('gulp');
var postcss = require('gulp-postcss');

var cssnext = require('cssnext');
// var precss = require('precss');//这个不行
// var syntax = require('postcss-scss');
var sass = require('gulp-sass');
var	autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('scss', function () {
  // var processors = [
	 //  	autoprefixer,
	 //    cssnext,
	 //    sass
  // ];
  return gulp.src('./web/scss/*.scss')
    .pipe(sass({includePaths: ['./web/scss/']}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./web/css'))
    .pipe(reload({ stream:true }));
});

gulp.task('watch', function() {
  gulp.watch(['./web/scss/*.scss','./web/scss/partials/*.scss','./web/*.html'], ['scss']);
});

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('serve', ['scss'], function() {
  browserSync({
    server: {
      baseDir: 'web'
    }
  });

  gulp.watch(['./web/scss/*.scss','*.html','./web/images/**','./web/scss/partials/*.scss','./web/*.html'], ['scss']);
});