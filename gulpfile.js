let gulp = require("gulp");
let eslint = require("gulp-eslint");
let mocha = require('gulp-mocha');

gulp.task("eslint", function() {
	return gulp.src('lib/**')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task("lint", ["eslint"]);

gulp.task("test.unit", function () {
	return gulp.src("test/unit/**/*.js", {read: false})
		.pipe(mocha());
});

gulp.task("test", ["test.unit"]);
