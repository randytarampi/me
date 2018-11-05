require("./babel.register.js");

module.exports = {};

module.exports.clean = ({relativePath, gulp}) => gulp.task("clean", () => {
    const vinylPaths = require("vinyl-paths");
    const del = require("del");
    const path = require("path");

    const directories = [".serverless/", ".webpack/", ".dynamodb/", "coverage/", ".nyc_output/", "dist/", "build/"].map(directory => path.join(relativePath, directory));

    return gulp.src(directories, {allowEmpty: true})
        .pipe(vinylPaths(del));
});

const isFixed = file => file.eslint && file.eslint.fixed;
module.exports.eslint = ({relativePath, gulp}) => gulp.task("eslint", () => {
    const path = require("path");
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");

    return gulp.src([path.join(relativePath, "**/*.{js,jsx}")])
        .pipe(eslint({fix: true, ignorePath: path.join(relativePath, "../../.eslintignore")}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(relativePath)))
        .pipe(eslint.failAfterError());
});
module.exports.sassLint = ({relativePath, gulp}) => gulp.task("sassLint", () => {
    const path = require("path");
    const sassLint = require("gulp-sass-lint");

    return gulp.src([path.join(relativePath, "sass/**/*.s+(a|c)ss")])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
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

module.exports.testUnit = ({relativePath, gulp}) => gulp.task("test.unit", () => {
    const path = require("path");
    const mocha = require("gulp-mocha");
    const mochaConfig = require(path.join(relativePath, "./mocha.config"));

    return gulp.src([path.join(relativePath, "test/unit/**/*.{js,jsx}")], {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});
module.exports.testIntegration = ({relativePath, gulp}) => gulp.task("test.integration", () => {
    const path = require("path");
    const mocha = require("gulp-mocha");
    const mochaConfig = require(path.join(relativePath, "./mocha.config"));

    return gulp.src([path.join(relativePath, "test/integration/**/*.{js,jsx}")], {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});
module.exports.test = ({gulp}) => gulp.task("test", gulp.parallel(["test.unit", "test.integration"]));

module.exports.webpack = ({relativePath, gulp}) => gulp.task("webpack", callback => {
    const path = require("path");
    const Webpack = require("webpack");
    const webpackConfig = require(path.join(relativePath, "./webpack.client.config"));

    Webpack(webpackConfig, function (error, stats) {
        if (error) {
            return callback(error);
        }
        console.log(stats.toString({colors: true})); // eslint-disable-line no-console
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});
