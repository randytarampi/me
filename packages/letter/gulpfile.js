require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

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
            "../../node_modules/materialize-css/dist/fonts/roboto/**",
            "../../node_modules/@fortawesome/fontawesome-free/webfonts/**",
            "node_modules/@randy.tarampi/assets/web/**",
            "node_modules/@randy.tarampi/css/node_modules/materialize-css/dist/fonts/roboto/**",
            "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/webfonts/**"
        ])
        .pipe(gulp.dest("./dist"));
});

gulp.task("views", () => {
    const config = require("config");
    const pug = require("gulp-pug");
    const packageJson = require("./package.json");

    return gulp.src(["node_modules/@randy.tarampi/views/templates/index.pug"])
        .pipe(pug({
            locals: {
                bundleName: "letter",
                assetUrl: config.get("assetUrl"),
                sentryDsn: config.get("sentryDsn"),
                gtm: config.get("gtm"),
                environment: process.env.NODE_ENV || "local",
                version: packageJson.version,
                name: packageJson.name,
                logger: JSON.stringify(config.get("logger"))
            }
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("letter:pdf", async () => {
    const path = require("path");
    process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

    const assembleLetters = require("./lib/assembleLetters").default;
    const renderHtml = require("./lib/renderHtml").default;
    const renderPdf = require("./lib/renderPdf").default;
    const server = require("./express");

    return assembleLetters()
        .then(letters => Promise.all(letters.map(letter => {
            let letterHtml = renderHtml(letter);

            return renderPdf(letterHtml, letter)
                .then(() => server.close());
        })));
});

gulp.task("letter:html", () => {
    const path = require("path");
    process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

    const fs = require("fs");
    const assembleLetters = require("./lib/assembleLetters").default;
    const renderHtml = require("./lib/renderHtml").default;

    return assembleLetters()
        .then(letters => Promise.all(letters.map(letter => new Promise((resolve, reject) => {
            let letterHtml;

            try {
                letterHtml = renderHtml(letter);
            } catch (error) {
                return reject(error);
            }

            return fs.writeFile(`${__dirname}/dist/${letter.fileName}.html`, letterHtml, error => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        }))));
});

gulp.task("letter", gulp.series([
    gulp.parallel(["letter:pdf", "letter:html"])
]));

gulp.task("docs:dist", () => {
    return gulp
        .src([
            "dist/**"
        ])
        .pipe(gulp.dest("./docs"));
});

gulp.task("docs:index", () => {
    return gulp
        .src([
            "dist/*.html",
            "dist/*.pdf"
        ])
        .pipe(gulp.dest("."));
});

gulp.task("docs", gulp.series([
    "docs:dist",
    "docs:index"
]));

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

    return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*", "!./docs/**/*", "!./coverage/**/*", "!./.nyc_output/**/*"])
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest("./")))
        .pipe(eslint.failOnError());
});

gulp.task("sassLint", () => {
    const sassLint = require("gulp-sass-lint");

    return gulp.src("sass/**/*.+(sa|sc|c)ss")
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task("lint", gulp.parallel([
    "eslint",
    "sassLint"
]));

gulp.task("test.unit", () => {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/unit/**/*.{js,jsx}", {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

gulp.task("test.integration", () => {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/integration/**/*.{js,jsx}", {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

gulp.task("test", gulp.parallel([
    "test.unit",
    "test.integration"
]));

gulp.task("build", gulp.series([
    "clean",
    gulp.parallel(["copy", "webpack"]),
    "views"
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "copy", "webpack:dev"]),
    "views"
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));
