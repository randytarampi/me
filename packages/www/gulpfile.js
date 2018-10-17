require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const gulp = require("gulp");
const config = require("config");

gulp.task("clean", () => {
    const vinylPaths = require("vinyl-paths");
    const del = require("del");

    return gulp.src(["dist/", "build/", "coverage/", ".nyc_output/"], {allowEmpty: true})
        .pipe(vinylPaths(del));
});

gulp.task("copy", () => {
    return gulp
        .src([
            "*.md",
            "node_modules/@randy.tarampi/assets/web/**",
            "node_modules/@randy.tarampi/css/node_modules/materialize-css/dist/fonts/roboto/**",
            "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/webfonts/**"
        ])
        .pipe(gulp.dest("./dist"));
});

const buildViewForPageUrl = (basename, pageUrl = config.get("www.publishUrl")) => () => {
    const pug = require("gulp-pug");
    const rename = require("gulp-rename");
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("@randy.tarampi/views");

    return gulp.src(["node_modules/@randy.tarampi/views/templates/index.pug"])
        .pipe(pug({
            locals: buildPugLocals({
                bundleName: "www",
                serviceWorkerBundleName: "www.sw",
                packageJson,
                pageUrl,
                injectedScript: [
                    `<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="${config.get("crisp")}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`
                ].join("")
            })
        }))
        .pipe(rename({basename}))
        .pipe(gulp.dest("./dist"));
};

const viewsTasks = [
    ["index"],
    ["404"],
    ["blog", `${config.get("www.publishUrl")}${config.get("www.postsUrl")}`],
    ["photos", `${config.get("www.publishUrl")}${config.get("www.photosUrl")}`],
    ["words", `${config.get("www.publishUrl")}${config.get("www.wordsUrl")}`],
    ["resume", `${config.get("www.publishUrl")}${config.get("www.resumeUrl")}`],
    ["letter", `${config.get("www.publishUrl")}${config.get("www.letterUrl")}`]
];
viewsTasks.forEach(([pageName, pageUrl]) =>
    gulp.task(`views:${pageName}`, buildViewForPageUrl(pageName, pageUrl))
);

gulp.task("views", gulp.parallel(viewsTasks.map(([pageName]) => `views:${pageName}`)));

gulp.task("docs:dist", () => {
    return gulp
        .src([
            "dist/**",
            "CNAME"
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

gulp.task("pugLint", () => {
    var pugLinter = require("gulp-pug-linter");

    return gulp
        .src("views/**/*.pug")
        .pipe(pugLinter())
        .pipe(pugLinter.reporter("fail"));
});

gulp.task("lint", gulp.parallel([
    "eslint",
    "sassLint",
    "pugLint"
]));

gulp.task("test.integration", () => {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/integration/**/*.{js,jsx}", {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

gulp.task("test.unit", () => {
    const mocha = require("gulp-mocha");
    const mochaConfig = require("./mocha.config");

    return gulp.src("test/unit/**/*.{js,jsx}", {read: false, allowEmpty: true})
        .pipe(mocha(mochaConfig));
});

gulp.task("test", gulp.parallel([
    "test.integration",
    "test.unit"
]));

gulp.task("sitemap", (done) => {
    const config = require("config");
    const fs = require("fs");
    const ReactRouterSitemap = require("react-router-sitemap").default;
    const routes = require("./public/routes").default;

    const publishUrl = config.get("www.publishUrl");

    try {
        ReactRouterSitemap.fromRouteConfiguration(routes)
            .filterPaths({
                isValid: false,
                rules: [
                    /\*/,
                    /^\/:unsupportedPath/
                ]
            })
            .applyParams({
                "/resume/:variant?": [
                    {"variant?": ""}
                ],
                "/letter/:variant?": [
                    {"variant?": ""}
                ]
            })
            .build(publishUrl)
            .save(path.join(__dirname, "dist/sitemap.xml"));

        fs.writeFile(path.join(__dirname, "dist/robots.txt"), `Sitemap: ${config.get("www.publishUrl")}${config.get("www.assetUrl")}/sitemap.xml`, done);
    } catch (error) {
        done(error);
    }
});

gulp.task("build", gulp.series([
    "clean",
    gulp.parallel(["copy", "views", "webpack", "sitemap"]),
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "copy", "views", "webpack", "sitemap"]),
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));

