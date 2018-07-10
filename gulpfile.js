const gulp = require('gulp');
const childProcess = require('child_process');
const gulpLoadPlugins = require('gulp-load-plugins');

let plugins = gulpLoadPlugins();

gulp.task('server start', function () {
  plugins.nodemon({
    script: './server.js',
    ext: 'js'
  });
});

gulp.task('eslint', function () {
  return gulp.src('app/**/*.js')
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('watch:eslint', function () {
  gulp.watch('app/**/*.js', ['eslint'])
});