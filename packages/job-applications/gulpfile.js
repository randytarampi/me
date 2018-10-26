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

gulp.task("lint", gulp.parallel([
    "eslint"
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

const buildPrintableResumeRendererParameters = ({printableDestinationDirectory} = {}) => {
    const path = require("path");
    const config = require("config");
    const packageJson = require("./package");
    const {
        ServerApp: printableComponent
    } = require("@randy.tarampi/resume");

    return {
        printableComponent,
        printableStylesPath: path.join(__dirname, "node_modules/@randy.tarampi/resume/dist/styles.css"),
        printableRenderOptions: {
            bundleName: "jobApplications",
            pageUrl: config.get("resume.publishUrl"),
            packageJson,
            assetUrl: config.get("letter.assetUrl")
        },
        printableDestinationDirectory
    };
};

const buildPrintableLetterRendererParameters = ({printableDestinationDirectory} = {}) => {
    const path = require("path");
    const config = require("config");
    const packageJson = require("./package");
    const {
        ServerApp: printableComponent
    } = require("@randy.tarampi/letter");

    return {
        printableComponent,
        printableStylesPath: path.join(__dirname, "node_modules/@randy.tarampi/letter/dist/styles.css"),
        printableRenderOptions: {
            bundleName: "jobApplications",
            pageUrl: config.get("letter.publishUrl"),
            packageJson,
            assetUrl: config.get("letter.assetUrl")
        },
        printableDestinationDirectory
    };
};

const renderPrintable = (printable, {printableComponent, printableStylesPath, printableRenderOptions, printableDestinationDirectory = path.join(__dirname, "dist")} = {}) => {
    const {renderHtml, renderPdf, renderPrintableHtml} = require("@randy.tarampi/printables");

    const htmlRenderer = renderHtml({
        printableComponent,
        printableStylesPath
    });
    const printableRenderer = renderPrintableHtml(htmlRenderer, printableRenderOptions);

    return printableRenderer(printable)
        .then(printableHtmlPrintablePair => renderPdf({
            ...printableHtmlPrintablePair,
            printable,
            printableDestinationDirectory
        }));
};

const renderResume = resume => {
    return renderPrintable(resume, buildPrintableResumeRendererParameters());
};

const renderLetter = letter => {
    return renderPrintable(letter, buildPrintableLetterRendererParameters());
};

gulp.task("job-applications:pdf", async () => {
    const path = require("path");
    const args = require("yargs").argv;
    const server = require("./server");
    const jobApplication = require(path.join(__dirname, "src/job-applications", args.file || args.name || "")).default;

    return Promise.all([
            renderLetter(jobApplication.letter),
            renderResume(jobApplication.resume)
        ])
        .then(() => server.close())
        .catch(error => {
            server.close();
            throw error;
        });
});

gulp.task("job-applications", gulp.series([
    "job-applications:pdf"
]));

gulp.task("build", gulp.series([
    "job-applications"
]));

gulp.task("default", gulp.series([
    "build"
]));
