let gulp = require("gulp");
let eslint = require("gulp-eslint");

gulp.task("eslint", function() {
	return gulp.src('lib/**')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task("lint", ["eslint"]);