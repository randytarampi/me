require("./babel.register.js");

module.exports = {};

module.exports.clean = ({relativePath, gulp}) => gulp.task("clean", () => {
    const vinylPaths = require("vinyl-paths");
    const del = require("del");
    const path = require("path");

    const directories = [".serverless/", ".webpack/", ".dynamodb/", "coverage/", ".nyc_output/", "dist/", "build/", "esm/", "es5/"].map(directory => path.join(relativePath, directory));

    return gulp.src(directories, {allowEmpty: true})
        .pipe(vinylPaths(del));
});

const isFixed = file => file.eslint && file.eslint.fixed;
module.exports.eslint = ({relativePath, gulp}) => gulp.task("eslint", () => {
    const fs = require("fs");
    const path = require("path");
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");
    const resultsFile = process.env.PULL_REQUEST && fs.createWriteStream(path.join(relativePath, "eslint-results.xml"));

    const stream = gulp.src([path.join(relativePath, "**/*.{js,jsx}")])
        .pipe(eslint({fix: true, ignorePath: path.join(relativePath, "../../.eslintignore")}))
        .pipe(
            resultsFile
                ? eslint.format("junit", resultsFile)
                : eslint.format()
        )
        .pipe(gulpIf(isFixed, gulp.dest(relativePath)))
        .pipe(eslint.failAfterError());

    stream.on("finish", () => resultsFile.end());

    return stream;
});
module.exports.sassLint = ({relativePath, gulp}) => gulp.task("sassLint", () => {
    const fs = require("fs");
    const path = require("path");
    const sassLint = require("gulp-sass-lint");
    const resultsFile = process.env.PULL_REQUEST && fs.createWriteStream(path.join(relativePath, "sassLint-results.xml"));

    const stream = gulp.src([path.join(relativePath, "sass/**/*.s+(a|c)ss")])
        .pipe(sassLint({
            options: {
                formatter: resultsFile
                    ? "junit"
                    : undefined
            }
        }))
        .pipe(sassLint.format(resultsFile))
        .pipe(sassLint.failOnError());

    stream.on("finish", () => resultsFile.end());

    return stream;
});
module.exports.pugLint = ({relativePath, gulp}) => gulp.task("pugLint", () => {
    const path = require("path");
    const pugLinter = require("gulp-pug-linter");

    return gulp
        .src(path.join(relativePath, "views/**/*.pug"))
        .pipe(pugLinter({failAfterError: true}));
});

module.exports.stylesDev = ({relativePath, gulp}) => gulp.task("styles:dev", () => {
    const path = require("path");
    const autoprefixer = require("gulp-autoprefixer");
    const concat = require("gulp-concat");
    const sass = require("gulp-sass");

    return gulp.src([path.join(relativePath, "styles/style.scss")])
        .pipe(sass({
            includePaths: [
                path.join(relativePath, "node_modules"),
                path.join(relativePath, "../css/node_modules"),
                path.join(relativePath, "../../node_modules")
            ]
        })
            .on("error", sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest(path.join(relativePath, "dist")));
});
module.exports.styles = ({relativePath, gulp}) => gulp.task("styles", gulp.series(["styles:dev"]), () => {
    const path = require("path");
    const cleanCss = require("gulp-clean-css");
    const sourcemaps = require("gulp-sourcemaps");

    return gulp.src([path.join(relativePath, "dist/styles.css")])
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.join(relativePath, "dist")));
});

module.exports.testMocha = ({relativePath, gulp, testType}) => gulp.task(`test.${testType}`, () => {
    const path = require("path");
    const mocha = require("gulp-mocha");
    const mochaConfig = require(path.join(relativePath, "./mocha.config"));

    if (
        mochaConfig.reporter === "mocha-junit-reporter"
        && mochaConfig.reporterOptions
        && mochaConfig.reporterOptions.properties
    ) {
        process.env.PROPERTIES = process.env.PROPERTIES
            || Object.keys(mochaConfig.reporterOptions.properties)
                .filter(key => !!mochaConfig.reporterOptions.properties[key])
                .map(key => `${key}:${mochaConfig.reporterOptions.properties[key]}`)
                .join(",");
    }

    return gulp.src([path.join(relativePath, `test/${testType}/**/*.{js,jsx}`)], {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});
module.exports.testUnit = ({relativePath, gulp}) => module.exports.testMocha({
    relativePath,
    gulp,
    testType: "unit"
});
module.exports.testIntegration = ({relativePath, gulp}) => module.exports.testMocha({
    relativePath,
    gulp,
    testType: "integration"
});
module.exports.test = ({gulp}) => gulp.task("test", gulp.parallel(["test.unit", "test.integration"]));

module.exports.webpack = ({relativePath, webpackConfigName = "./webpack.client.config", gulp, taskName = "webpack"}) => gulp.task(taskName, callback => {
    const path = require("path");
    const Webpack = require("webpack");
    const webpackConfig = require(path.join(relativePath, webpackConfigName));

    Webpack(webpackConfig, function (error, stats) {
        if (error) {
            return callback(error);
        }
        console.log(stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});
