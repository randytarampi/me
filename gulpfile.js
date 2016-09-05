const gulp = require("gulp");
const gulpIf = require("gulp-if");
const eslint = require("gulp-eslint");
const mocha = require("gulp-mocha");

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task("eslint", function() {
	return gulp.src(["**/*.js", "!./node_modules/**/*"])
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

gulp.task("test", ["test.unit"]);
