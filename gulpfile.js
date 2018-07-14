require("babel-register");

const gulp = require("gulp");

gulp.task("clean", () => {
    const vinylPaths = require("vinyl-paths");
    const del = require("del");

    return gulp.src(["dist/", "build/", "coverage/", ".nyc_output/"], {allowEmpty: true})
        .pipe(vinylPaths(del));
});

gulp.task("copy", () => {
    return gulp
        .src([
            "public/assets/**",
            "node_modules/materialize-css/dist/fonts/roboto/**"
        ])
        .pipe(gulp.dest("./dist"));
});

gulp.task("views", () => {
    const pug = require("gulp-pug");
    const config = require("config");
    const packageJson = require("./package.json");

    return gulp.src(["views/index.pug"])
        .pipe(pug({
            locals: {
                appUrl: config.get("appUrl"),
                photosUrl: config.get("photosUrl"),
                sentryDsn: config.get("sentryDsn"),
                gtm: config.get("gtm"),
                environment: process.env.NODE_ENV || "local",
                version: packageJson.version
            }
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("docs", () => {
    return gulp
        .src([
            "dist/**"
        ])
        .pipe(gulp.dest("./docs"));
});

gulp.task("styles:dev", () => {
    const autoprefixer = require("gulp-autoprefixer");
    const sass = require("gulp-sass");
    const concat = require("gulp-concat");

    return gulp.src([
            "styles/style.scss"
        ])
        .pipe(sass({
            includePaths: ["node_modules", "../../node_modules"]
        }).on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["cover 99.5%"],
            cascade: false
        }))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("dist"));
});

gulp.task("styles", gulp.series(["styles:dev"]), () => {
    const cleanCss = require("gulp-clean-css");
    const sourcemaps = require("gulp-sourcemaps");

    return gulp.src("dist/styles.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist"));
});

gulp.task("webpack:dev", function (callback) {
    const WebPack = require("webpack");
    const WebPackConfig = require("./webpack.client.config");
    const webpackConfig = Object.assign({}, WebPackConfig);

    WebPack(webpackConfig, function (err, stats) {
        console.log("[webpack:dev]", stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});

gulp.task("webpack", function (callback) {
    const WebPack = require("webpack");
    const WebPackConfig = require("./webpack.client.config");
    const webpackConfig = Object.assign({}, WebPackConfig, {
        mode: "production"
    });

    WebPack(webpackConfig, function (err, stats) {
        console.log("[webpack:prod]", stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});

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

gulp.task("sassLint", () => {
    const sassLint = require("gulp-sass-lint");

    return gulp.src("sass/**/*.s+(a|c)ss")
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task("lint", gulp.parallel([
    "eslint",
    "sassLint"
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

gulp.task("build", gulp.series([
    "clean",
    gulp.parallel(["copy", "views", "styles", "webpack"])
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "copy", "views", "styles:dev"]),
    "webpack:dev"
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));
