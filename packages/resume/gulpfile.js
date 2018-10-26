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

gulp.task("views", () => {
    const pug = require("gulp-pug");
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("@randy.tarampi/views");

    return gulp.src(["node_modules/@randy.tarampi/views/templates/index.pug"])
        .pipe(pug({
            locals: buildPugLocals({
                bundleName: "resume",
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
    const printableBuilder = require("./src/lib/buildResume").default;

    return {
        printableComponent,
        printableStylesPath: path.join(__dirname, "dist/styles.css"),
        printableBuilder,
        printableTemplateDirectory: path.join(__dirname, "src/resumes"),
        printableRenderOptions: {
            bundleName: "resume",
            pageUrl: config.get("resume.publishUrl"),
            packageJson,
            assetUrl: config.get("resume.assetUrl")
        },
        printableDestinationDirectory: path.join(__dirname, "dist")
    };
};

gulp.task("resume:pdf", async () => {
    const server = require("./server");
    const {renderPrintablesToPdf} = require("@randy.tarampi/printables");

    return renderPrintablesToPdf(buildPrintablesParameters())
        .then(() => server.close())
        .catch(error => {
            server.close();
            throw error;
        });
});

gulp.task("resume:html", () => {
    const {renderPrintablesToHtml} = require("@randy.tarampi/printables");

    return renderPrintablesToHtml(buildPrintablesParameters());
});

gulp.task("resume:json", done => {
    const fs = require("fs");
    const config = require("config");
    const path = require("path");
    const baseResumePath = path.join(__dirname, "src/resumes/resume.json");
    const resume = require(baseResumePath);
    const {Person} = require("@randy.tarampi/js");
    const basics = Person.fromJSON(config.get("me.resume.basics")).toResume();

    return fs.writeFile(baseResumePath, JSON.stringify({
        ...resume,
        basics
    }, null, 2), done);
});

gulp.task("resume", gulp.series([
    "resume:json",
    gulp.parallel(["resume:html", "resume:pdf"])
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
