import {createRequire} from "module";

import "./babel.register.cjs";

const require = createRequire(import.meta.url);

export const clean = ({relativePath, gulp}) => gulp.task("clean", () => {
    // NOTE-RT: ESM `.default` pattern — see docs/CONVENTIONS.md#esm-rules
    const vinylPaths = require("vinyl-paths").default || require("vinyl-paths");
    const {deleteAsync} = require("del");
    const path = require("path");

    const directories = [".serverless/", ".webpack/", ".dynamodb/", "coverage/", ".nyc_output/", "dist/", "build/", "esm/", "es5/"].map(directory => path.join(relativePath, directory));

    return gulp.src(directories, {allowEmpty: true})
        .pipe(vinylPaths(deleteAsync));
});

const isFixed = file => file.eslint && file.eslint.fixed;

export const eslint = ({relativePath, gulp}) => gulp.task("eslint", () => {
    const fs = require("fs");
    const path = require("path");
    const eslint = require("gulp-eslint-new");
    const gulpIf = require("gulp-if");
    const resultsFile = process.env.CI && fs.createWriteStream(path.join(relativePath, "eslint-results.xml"));

    const stream = gulp.src([path.join(relativePath, "**/*.{js,jsx}")])
        .pipe(eslint({fix: true}))
        .pipe(
            resultsFile
                ? eslint.format("junit", resultsFile)
                : eslint.format()
        )
        .pipe(gulpIf(isFixed, gulp.dest(relativePath)))
        .pipe(eslint.failAfterError());

    stream.on("finish", () => resultsFile && resultsFile.end());

    return stream;
});

export const pugLint = ({relativePath, gulp}) => gulp.task("pugLint", () => {
    const path = require("path");
    const pugLinter = require("gulp-pug-linter");

    return gulp
        .src(path.join(relativePath, "views/**/*.pug"))
        .pipe(pugLinter({failAfterError: true}));
});

export const stylesDev = ({relativePath, gulp}) => gulp.task("styles:dev", () => {
    const path = require("path");
    const autoprefixer = require("gulp-autoprefixer").default || require("gulp-autoprefixer");
    const concat = require("gulp-concat");
    const sass = require("gulp-sass")(require("sass"));

    return gulp.src([path.join(relativePath, "styles/style.scss")])
        .pipe(sass({
            // NOTE-RT: `loadPaths` (not `includePaths`) — see docs/CONVENTIONS.md#building
            loadPaths: [
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

export const styles = ({relativePath, gulp}) => gulp.task("styles", gulp.series(["styles:dev"]), () => {
    const path = require("path");
    const cleanCss = require("gulp-clean-css");
    const sourcemaps = require("gulp-sourcemaps");

    return gulp.src([path.join(relativePath, "dist/styles.css")])
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.join(relativePath, "dist")));
});

// NOTE-RT: recursively checks whether `directory` contains at least one `.js` file outside any
// `actions/` subdirectory, mirroring `testMocha`'s own spec glob/exclusion below.
const containsSpecFiles = (fs, path, directory) => fs.readdirSync(directory, {withFileTypes: true}).some(entry => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
        return entry.name !== "actions" && containsSpecFiles(fs, path, entryPath);
    }

    return entry.isFile() && path.extname(entry.name) === ".js";
});

export const testMocha = ({relativePath, gulp, testType}) => gulp.task(`test.${testType}`, () => {
    const fs = require("fs");
    const path = require("path");
    const mocha = require("gulp-mocha").default || require("gulp-mocha");
    const mochaConfigPath = fs.existsSync(path.join(relativePath, "./mocha.config.cjs"))
        ? path.join(relativePath, "./mocha.config.cjs")
        : path.join(relativePath, "./mocha.config");
    const rawMochaConfig = require(mochaConfigPath);
    const mochaConfig = rawMochaConfig?.default || rawMochaConfig;
    const testDirectory = path.join(relativePath, `test/${testType}`);

    if (!fs.existsSync(testDirectory)) {
        return Promise.resolve();
    }

    // NOTE-RT: some packages' `test/integration` directories hold only non-`.js`-extension
    // fixtures/stubs (e.g. `jsx`'s leftover, never-finished RTL-migration `.jsx` placeholders) and
    // have zero real `.js` spec files. Passing an empty file list straight through to the
    // underlying `mocha` CLI (via `gulp-mocha`) makes Mocha silently fall back to its own default
    // spec discovery - scanning the whole `test/` directory, including this config's own
    // `require`-only setup files (e.g. `01_setup.js`) - which then crashes trying to load those as
    // native ESM. Skip the task entirely instead, same as the "directory doesn't exist" case above.
    if (!containsSpecFiles(fs, path, testDirectory)) {
        return Promise.resolve();
    }

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

    return gulp.src([
        path.join(testDirectory, "**/*.js"),
        `!${path.join(testDirectory, "**/actions/**/*.js")}`
    ], {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

export const testUnit = ({relativePath, gulp}) => testMocha({
    relativePath,
    gulp,
    testType: "unit"
});

export const testIntegration = ({relativePath, gulp}) => testMocha({
    relativePath,
    gulp,
    testType: "integration"
});

export const test = ({gulp}) => gulp.task("test", gulp.parallel(["test.unit", "test.integration"]));

export const webpack = ({relativePath, webpackConfigName = "./webpack.client.config", gulp, taskName = "webpack"}) => gulp.task(taskName, callback => {
    const path = require("path");
    const Webpack = require("webpack");
    const webpackConfigModule = require(path.join(relativePath, webpackConfigName));
    const webpackConfig = webpackConfigModule?.default || webpackConfigModule;

    Webpack(webpackConfig, function (error, stats) {
        if (error) {
            return callback(error);
        }
        console.log(stats.toString({colors: true}));
        callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
    });
});

export default {
    clean,
    eslint,
    pugLint,
    stylesDev,
    styles,
    testMocha,
    testUnit,
    testIntegration,
    test,
    webpack
};
