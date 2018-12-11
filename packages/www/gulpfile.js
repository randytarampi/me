require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const gulp = require("gulp");
const config = require("config");
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

baseGulpfile.webpack(taskParameters);

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

const buildViewForPageUrl = (basename, pageUrl = config.get("www.publishUrl")) => () => {
    const pug = require("gulp-pug");
    const rename = require("gulp-rename");
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("@randy.tarampi/views");

    return gulp.src(["node_modules/@randy.tarampi/views/templates/index.pug"])
        .pipe(pug({
            locals: buildPugLocals({
                bundleName: config.get("www.bundle.name"),
                serviceWorkerInstallerBundleName: config.get("www.bundle.swInstaller"),
                packageJson,
                pageUrl,
                injectedScript: [
                    `<script>window.$crisp=[];window.CRISP_WEBSITE_ID="${config.get("crisp.app.id")}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`
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

