require("../../babel.register.js");

const gulp = require("gulp");

function isFixed(file) {
    return file.eslint !== null && file.eslint.fixed;
}

gulp.task("eslint", () => {
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");

    return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*", "!./docs/**/*", "!./coverage/**/*"])
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest("./")))
        .pipe(eslint.failOnError());
});
gulp.task("lint", gulp.parallel([
    "eslint"
]));

gulp.task("test.unit", function () {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/unit/**/*.js", {read: false})
        .pipe(mocha(mochaConfig));
});

gulp.task("test.integration", function () {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/integration/**/*.js", {read: false})
        .pipe(mocha(mochaConfig));
});

gulp.task("test", gulp.parallel(["test.unit", "test.integration"]));
