// Dump the printable HTML for a job-application artifact exactly as the gulp task renders it
// (two-stage renderHtml factory — see packages/printables/src/lib/renderHtml.js NOTE-RT).
// Diagnosis companion to test/integration/pdf-output.js; the wave-1..4 font/bear/pagination
// bugs were all localized by inspecting this output.
//
// Usage (from anywhere):
//   node scripts/dump-printable-html.mjs resume [output.html]
//   node scripts/dump-printable-html.mjs letter [output.html]
import {createRequire} from "module";
import path from "path";
import fs from "fs";
import process from "process";

const printableType = process.argv[2] === "letter" ? "letter" : "resume";
const outputPath = process.argv[3] || path.resolve(`dump.${printableType}.html`);

const jobDir = path.resolve(new URL("..", import.meta.url).pathname);
const require = createRequire(path.join(jobDir, "gulpfile.js"));
require(path.join(jobDir, "../../babel.register.cjs"));
process.env.NODE_CONFIG_DIR = path.join(jobDir, "../../config");
process.env.NODE_ENV = "printable";

const config = require("config");
const packageJson = require(path.join(jobDir, "package"));
const {ServerApp: printableComponent} = require(`@randy.tarampi/${printableType}`);
const {renderHtml} = require("@randy.tarampi/printables");

const printableStylesPath = path.join(path.dirname(require.resolve(`@randy.tarampi/${printableType}/package.json`)), "dist/styles.css");
console.log("stylesPath:", printableStylesPath, "exists:", fs.existsSync(printableStylesPath));

// NOTE-RT: renderHtml's pug-template fallback is cwd-relative (`../views/templates/index.pug`),
// so the template path must be passed explicitly here — see the renderHtml NOTE-RT.
const printableTemplatePath = path.join(jobDir, "../views/templates/index.pug");

const jobApplication = require(path.join(jobDir, "src/job-applications/some-awesome-company.jsx")).default;

const htmlRenderer = renderHtml({printableComponent, printableStylesPath, printableTemplatePath});
const html = htmlRenderer({
    printable: jobApplication[printableType],
    bundleName: "jobApplications",
    pageUrl: config.get(`${printableType}.publishUrl`),
    packageJson,
    assetUrl: config.get(`${printableType}.assetUrl`),
    [`published${printableType === "letter" ? "Letter" : "Resume"}Url`]: config.get(`${printableType}.publishUrl`)
});

fs.writeFileSync(outputPath, html);
console.log("written:", outputPath, `(${html.length} bytes)`);

if (printableType === "letter") {
    const m = html.match(/<div id="letter-intro-hello-bear"[^>]*>/);
    console.log("bear markup:", m ? m[0] : "NOT FOUND");
}