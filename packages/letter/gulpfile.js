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
    const sources = [
        "*.md",
        "node_modules/@randy.tarampi/assets/web/*",
        `node_modules/@randy.tarampi/assets/web/${process.env.NODE_ENV}/*`,
        "node_modules/@randy.tarampi/css/node_modules/materialize-css/dist/fonts/roboto/**",
        "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/webfonts/**"
    ];

    if (process.env.NODE_ENV) {
        sources.push(`node_modules/@randy.tarampi/assets/web/${process.env.NODE_ENV}/*`);
    }

    return gulp
        .src(sources)
        .pipe(gulp.dest("./dist"));
});

gulp.task("views", () => {
    const pug = require("gulp-pug");
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("@randy.tarampi/views");

    return gulp.src(["node_modules/@randy.tarampi/views/templates/index.pug"])
        .pipe(pug({
            locals: buildPugLocals({
                bundleName: "letter",
                packageJson
            })
        }))
        .pipe(gulp.dest("./dist"));
});

const buildPrintablesParameters = () => {
    const path = require("path");
    const config = require("config");
    const packageJson = require("./package");
    const printableComponent = require("./src/public/views/serverApp").default;
    const printableBuilder = require("./src/lib/buildLetter").default;

    return {
        printableComponent,
        printableStylesPath: path.join(__dirname, "dist/styles.css"),
        printableBuilder,
        printableTemplateDirectory: path.join(__dirname, "src/letters"),
        printableRenderOptions: {
            bundleName: "letter",
            pageUrl: config.get("letter.publishUrl"),
            packageJson,
            assetUrl: config.get("letter.assetUrl")
        },
        printableDestinationDirectory: path.join(__dirname, "dist")
    };
};

gulp.task("letter:pdf", async () => {
    const server = require("./server");
    const {renderPrintablesToPdf} = require("@randy.tarampi/printables");

    return renderPrintablesToPdf(buildPrintablesParameters())
        .then(() => server.close())
        .catch(error => {
            server.close();
            throw error;
        });
});

gulp.task("letter:html", () => {
    const {renderPrintablesToHtml} = require("@randy.tarampi/printables");

    return renderPrintablesToHtml(buildPrintablesParameters());
});

gulp.task("letter:json", done => {
    const fs = require("fs");
    const config = require("config");
    const path = require("path");
    const baseLetterPath = path.join(__dirname, "src/letters/letter.json");
    const baseLetter = require(baseLetterPath);

    return fs.writeFile(baseLetterPath, JSON.stringify({
        ...baseLetter,
        ...config.get("me.letter")
    }, null, 2), done);
});

gulp.task("letter", gulp.series([
    "letter:json",
    gulp.parallel(["letter:pdf", "letter:html"])
]));

gulp.task("docs:dist", () => {
    return gulp
        .src([
            "dist/**"
        ])
        .pipe(gulp.dest("./docs"));
});

gulp.task("docs", gulp.series([
    "docs:dist"
]));

gulp.task("webpack", function (callback) {
    const Webpack = require("webpack");
    const webpackConfig = require("./webpack.client.config");

    Webpack(webpackConfig, function (error, stats) {
        if (error) {
            return callback(error);
        }
        console.log(stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});

function isFixed(file) {
    return file.eslint && file.eslint.fixed;
}

gulp.task("eslint", () => {
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");

    return gulp.src(["**/*.js"])
        .pipe(eslint({fix: true, ignorePath: path.join(__dirname, "../../.eslintignore")}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest("./")))
        .pipe(eslint.failAfterError());
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
    gulp.parallel(["copy", "webpack", "views"])
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "copy", "webpack", "views"])
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));
