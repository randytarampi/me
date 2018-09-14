require("../../babel.register.js");

const gulp = require("gulp");

gulp.task("views:index", () => {
    const pug = require("gulp-pug");
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("./lib");

    return gulp.src(["templates/index.pug"])
        .pipe(pug({
            locals: buildPugLocals({
                bundleName: "views",
                packageJson
            })
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("views", gulp.parallel([
    "views:index"
]));

function isFixed(file) {
    return file.eslint !== null && file.eslint.fixed;
}

gulp.task("eslint", () => {
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");

    return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*", "!./docs/**/*", "!./coverage/**/*", "!./.nyc_output/**/*"])
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest("./")))
        .pipe(eslint.failAfterError());
});

gulp.task("pugLint", () => {
    var pugLinter = require("gulp-pug-linter");

    return gulp
        .src("templates/**/*.pug")
        .pipe(pugLinter())
        .pipe(pugLinter.reporter("fail"));
});

gulp.task("lint", gulp.parallel([
    "eslint",
    "pugLint"
]));

gulp.task("build", gulp.series([
    "views"
]));

gulp.task("default", gulp.series(["build"]));
