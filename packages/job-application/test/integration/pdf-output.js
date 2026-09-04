import assert from "node:assert/strict";
import {execFileSync} from "child_process";
import {mkdtempSync, rmSync} from "fs";
import os from "os";
import path from "path";
import {createRequire} from "module";
import {Helmet} from "react-helmet";
import {Map} from "immutable";

const require = createRequire(path.resolve("test/integration/pdf-output.js"));
global.__coverage__ = global.__coverage__ || {};
const root = path.resolve(".");
const templatePath = path.resolve(root, "../views/templates/index.pug");
const fixtures = ["a4", "legal", "letter", "some-awesome-company"];
const commands = ["pdfinfo", "pdftotext", "pdffonts"];
const commandAvailable = command => {
    try {
        execFileSync("which", [command], {stdio: "ignore"});
        return true;
    } catch {
        return false;
    }
};
const normalize = text => text.replace(/\s+/g, " ").trim();
const run = (command, args) => execFileSync(command, args, {encoding: "utf8"});
const loadFixture = name => require(path.join(root, "src/job-applications", `${name}.jsx`)).default;

describe("job-application PDF output", function () {
    this.timeout(180000);

    let destination;
    let renderPdf;
    let renderHtml;
    let renderPrintableHtml;
    let resumeComponent;
    let letterComponent;
    let config;
    let packageJson;

    before(async function () {
        Helmet.canUseDOM = false;
        const missing = commands.filter(command => !commandAvailable(command));
        if (missing.length) {
            console.warn(`Skipping PDF output integration tests; missing CLI tools: ${missing.join(", ")}`);
            this.skip();
        }
        ({renderHtml, renderPrintableHtml, renderPdf} = require("@randy.tarampi/printables"));
        ({ServerApp: resumeComponent} = require("@randy.tarampi/resume"));
        ({ServerApp: letterComponent} = require("@randy.tarampi/letter"));
        process.env.NODE_CONFIG = JSON.stringify({
            resume: {publishUrl: "https://www.randytarampi.ca/resume"},
            letter: {publishUrl: "https://www.randytarampi.ca/letter"}
        });
        config = require("config");
        packageJson = require(path.join(root, "package.json"));
        delete global.Infinite;
        delete global.regeneratorRuntime;
        delete global.__coverage__;
        destination = mkdtempSync(path.join(os.tmpdir(), "job-application-pdf-"));
    });

    after(function () {
        Helmet.canUseDOM = true;
        delete global.Infinite;
        delete global.regeneratorRuntime;
        if (destination) {
            rmSync(destination, {recursive: true, force: true});
        }
    });

    for (const fixtureName of fixtures) {
        it(`${fixtureName} resume and letter are printable one-page PDFs with embedded icons`, async function () {
            const application = loadFixture(fixtureName);
            const renderDocument = (printable, component, stylesPath, type) => {
                const htmlRenderer = renderHtml({
                    printableComponent: component,
                    printableStylesPath: stylesPath,
                    printableTemplatePath: templatePath
                });
                const publishUrl = config.get(`${type}.publishUrl`);
                const printableRenderer = renderPrintableHtml(htmlRenderer, {
                    bundleName: "jobApplications",
                    pageUrl: publishUrl,
                    packageJson,
                    assetUrl: config.get(`${type}.assetUrl`),
                    [type === "resume" ? "publishedResumeUrl" : "publishedLetterUrl"]: publishUrl
                });

                return printableRenderer(printable);
            };
            const documents = [
                {
                    kind: "resume",
                    printable: application.resume,
                    render: () => renderDocument(application.resume, resumeComponent, path.resolve(path.dirname(require.resolve("@randy.tarampi/resume/package.json")), "dist/styles.css"), "resume")
                },
                {
                    kind: "letter",
                    printable: application.letter,
                    render: () => renderDocument(application.letter, letterComponent, path.resolve(path.dirname(require.resolve("@randy.tarampi/letter/package.json")), "dist/styles.css"), "letter")
                }
            ];

            for (const {kind, printable, render} of documents) {
                const {printableHtml} = await render();
                // NOTE-RT: no *spurious* link--no-branding allowed — resumes should have zero,
                // and the letter legitimately has exactly one (intro.jsx's intentional
                // useBranding={false} "let me know" EmailLink). The wave-1 bug produced 47
                // spurious ones; count rather than blanket-match so intentional suppression
                // at a call site still passes.
                const noBrandingCount = (printableHtml.match(/class="[^"]*link--no-branding/g) || []).length;
                assert.equal(noBrandingCount, kind === "resume" ? 0 : 1, `unexpected link--no-branding count for ${kind}`);
                await renderPdf({
                    printableHtml,
                    printable: printable.set("renderExpectations", Map({pages: 1})),
                    printableDestinationDirectory: destination
                });
                const pdfPath = path.join(destination, `${printable.filename}.pdf`);
                const info = run("pdfinfo", [pdfPath]);
                assert.match(info, /Pages:\s+1/);
                // NOTE-RT: pdftotext needs the trailing `-` to write to stdout — without it the
                // extraction silently lands in a .txt file next to the PDF and stdout is empty.
                const pageText = normalize(run("pdftotext", ["-f", "1", "-l", "1", pdfPath, "-"]));
                // NOTE-RT: the footer URL comes from the environment's config (test env points at
                // localhost, printable/prd at randytarampi.ca) — derive the expected footer from
                // the same config the render used instead of hardcoding production URLs.
                const publishUrl = config.get(`${kind === "resume" ? "resume" : "letter"}.publishUrl`);
                const footer = kind === "resume"
                    ? `Print styles are hard to write and one page resumes are harder – check out the full copy at ${publishUrl}`
                    : `Check out (a generic copy of) this letter online at ${publishUrl}`;
                assert.ok(pageText.includes(normalize(footer)));
                assert.match(run("pdffonts", [pdfPath]), /fontawesome/i);

                if (fixtureName === "legal" && kind === "resume") {
                    assert.match(pageText, /Profiles|randytarampi/);
                    assert.ok(pageText.includes("Growing a team and a product from a seed round through a series A"));
                    assert.ok(!pageText.includes("Weddings"));
                }
            }
        });
    }
});
