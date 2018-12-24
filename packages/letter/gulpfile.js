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

gulp.task("build", gulp.series([
    "clean",
    gulp.parallel(["webpack"])
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "webpack"])
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));
