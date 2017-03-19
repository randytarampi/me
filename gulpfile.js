const eslint = require("gulp-eslint");
const gulp = require("gulp");
const coveralls = require("gulp-coveralls");
const gulpIf = require("gulp-if");
const mocha = require("gulp-mocha");

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task("eslint", () => {
	return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*", "!./coverage/**/*"])
		.pipe(eslint({fix: true}))
		.pipe(eslint.format())
		.pipe(gulpIf(isFixed, gulp.dest("./")))
		.pipe(eslint.failOnError());
});

gulp.task("lint", ["eslint"]);

gulp.task("test.unit", function () {
	return gulp.src("test/unit/**/*.js", {read: false})
		.pipe(mocha());
});

gulp.task("test.integration", function () {
	return gulp.src("test/integration/**/*.js", {read: false})
		.pipe(mocha());
});

gulp.task("test", ["test.unit", "test.integration"]);

gulp.task("coveralls", () => {
	return gulp.src("coverage/**/lcov.info")
		.pipe(coveralls());
});
