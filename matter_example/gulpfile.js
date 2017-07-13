var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var webpack = require('gulp-webpack');
var sass = require('gulp-sass');
var webpackConfig = require('./webpack.config.js');
var tsProject = ts.createProject('tsconfig.json');
var fs = require('fs');

gulp.task('tsc', function () {
    return gulp.src(['./src/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('./build/'));
});

gulp.task('dest', function () {
    return gulp.src(['./src/**/*.html', './src/**/*.js'])
        .pipe(gulp.dest('./build/'))
});


gulp.task('webserver', function () {
    gulp.src('./build/')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8000,
            livereload: true,
        }))
});

gulp.task('webpack', ["tsc"], function () {
    return gulp.src(['./build/**/*.js'])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./'));
});

gulp.task("watch", function () {
    gulp.watch(['./src/**/*.js'], ["dest"]);
});

gulp.task('default', function () {
    gulp.run(['dest', 'tsc', "watch", "webserver"]);
});
