'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

var testFiles = ['./test/*.js'];
var scriptFiles = ['./lib/*.js', './test/*.js'];

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch', () => {
  gulp.watch([scriptFiles, testFiles], ['lint', 'test']);
});

gulp.task('default', ['watch', 'lint', 'test']);
