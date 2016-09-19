"use strict";

const gulp = require("gulp");
const gulpIf = require("gulp-if");
const eslint = require("gulp-eslint");
const mocha = require("gulp-mocha");
const istanbul = require("gulp-istanbul");
const coveralls = require("gulp-coveralls");

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task("eslint", function() {
	return gulp.src(["**/*.js", "!./node_modules/**/*", "!./coverage/**/*"])
		.pipe(eslint({fix: true}))
		.pipe(eslint.format())
		.pipe(gulpIf(isFixed, gulp.dest("./")))
		.pipe(eslint.failOnError());
});

gulp.task("lint", ["eslint"]);

gulp.task("test.unit", () => {
	return gulp.src("test/unit/**/*.js", {read: false})
		.pipe(mocha());
});

gulp.task("test.integration", () => {
	return gulp.src("test/integration/**/*.js", {read: false})
		.pipe(mocha());
});

gulp.task("test", ["test.unit", "test.integration"]);

gulp.task("coverage.setup", coverageSetupTask);
gulp.task("coverage.setup.ci", ["eslint"], coverageSetupTask);
function coverageSetupTask() {
	return gulp.src(["lib/**/*.js"])
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
}

gulp.task("coverage", ["coverage.setup"], coverageTask);
gulp.task("coverage.ci", ["eslint", "coverage.setup.ci"], coverageTask);
function coverageTask() {
	return gulp.src("test/**/*.js", {read: false})
		.pipe(mocha())
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({thresholds: {global: 67}}));
}

gulp.task("coveralls", ["coverage"], coverallsTask);
gulp.task("coveralls.ci", ["eslint", "coverage.ci"], coverallsTask);
function coverallsTask() {
	return gulp.src("coverage/**/lcov.info")
		.pipe(coveralls());
}

gulp.task("travis", ["eslint", "coveralls.ci"]);