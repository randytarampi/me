require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const gulp = require("gulp");
const baseGulpfile = require("../../gulpfile.base");

const taskParameters = {
    relativePath: __dirname,
    gulp
};

baseGulpfile.clean(taskParameters);

baseGulpfile.eslint(taskParameters);
baseGulpfile.sassLint(taskParameters);
gulp.task("lint", gulp.parallel(["eslint", "sassLint"]));

baseGulpfile.testUnit(taskParameters);
baseGulpfile.testIntegration(taskParameters);
baseGulpfile.test(taskParameters);

baseGulpfile.webpack({...taskParameters, taskName: "webpack.es5", webpackConfigName: "webpack.client.config.es5.js"});
baseGulpfile.webpack({...taskParameters, taskName: "webpack.esm", webpackConfigName: "webpack.client.config.esm.js"});

gulp.task("webpack", gulp.parallel(["webpack.es5", "webpack.esm"]));

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

gulp.task("sitemap", (done) => {
    const config = require("config");
    const fs = require("fs");
    const ReactRouterSitemap = require("react-router-sitemap").default;
    const routes = require("./src/public/routes").default;

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
    gulp.parallel(["copy", "webpack", "sitemap"]),
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "copy", "webpack", "sitemap"]),
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));

