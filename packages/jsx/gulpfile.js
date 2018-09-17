require("../../babel.register.js");

const gulp = require("gulp");

function isFixed(file) {
    return file.eslint !== null && file.eslint.fixed;
}

gulp.task("eslint", () => {
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");

    return gulp.src(["**/*.js", "!./venv/**/*", "!./node_modules/**/*", "!./dist/**/*", "!./coverage/**/*"])
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest("./")))
        .pipe(eslint.failAfterError());
});

gulp.task("lint", gulp.series(["eslint"]));

gulp.task("test.unit", () => {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/unit/**/*.{js,jsx}", {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

gulp.task("test", gulp.parallel([
    "test.unit"
]));

gulp.task("clean", (callback) => {
    const del = require("del");

    del(["dist"], callback);
});

gulp.task("webpack", function (callback) {
    const Webpack = require("webpack");
    const webpackConfig = require("./webpack.client.config");

    Webpack(webpackConfig, function (err, stats) {
        console.log(stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});

gulp.task("build", gulp.series([
    "clean",
    gulp.parallel(["lint", "webpack"])
]));

gulp.task("build:dev", gulp.parallel(["lint", "webpack"]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));

