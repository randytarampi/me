require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const gulp = require("gulp");

gulp.task("views:index", () => {
    const config = require("config");
    const pug = require("gulp-pug");
    const packageJson = require("./package.json");

    return gulp.src(["templates/index.pug"])
        .pipe(pug({
            locals: {
                bundleName: "woof",
                assetUrl: config.get("assetUrl"),
                sentryDsn: config.get("sentryDsn"),
                gtm: config.get("gtm"),
                environment: process.env.NODE_ENV || "local",
                version: packageJson.version,
                name: packageJson.name,
                logger: null
            }
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
