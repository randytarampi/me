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
gulp.task("lint", gulp.parallel(["eslint"]));

baseGulpfile.testUnit(taskParameters);
baseGulpfile.testIntegration(taskParameters);
baseGulpfile.test(taskParameters);

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

const renderJobApplication = name => {
    const path = require("path");
    const jobApplication = require(path.join(__dirname, "src/job-applications", name || "")).default;

    return Promise.all([
        jobApplication.letter ? renderLetter(jobApplication.letter) : null,
        jobApplication.resume ? renderResume(jobApplication.resume) : null
    ]);
};

gulp.task("job-application:pdf", async () => {
    const args = require("yargs").argv;
    const server = require("./server");

    return renderJobApplication(args.file || args.name)
        .then(() => server.close())
        .catch(error => {
            server.close();
            throw error;
        });
});

gulp.task("job-applications", async () => {
    const fs = require("fs");
    const server = require("./server");

    return new Promise((resolve, reject) => {
        fs.readdir(path.join(__dirname, "src/job-applications"), (error, files) => {
            if (error) {
                return reject(error);
            }
            resolve(
                Promise.all(
                    files
                        .filter(file => path.extname(file) === ".jsx")
                        .map(file => renderJobApplication(file))
                )
            );
        });
    })
        .then(() => server.close())
        .catch(error => {
            server.close();
            throw error;
        });
});

gulp.task("job-application", gulp.series([
    "job-application:pdf"
]));
