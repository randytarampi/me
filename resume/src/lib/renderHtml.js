import {renderHtml as genericRenderHtml} from "@randy.tarampi/printables/html.js";
import path from "path";

import ResumeComponent from "../public/views/serverApp.jsx";
import Resume from "./resume.js";
// NOTE-RT: a static JSON import (rather than `readFileSync` + a computed `__dirname`/
// `import.meta.url` path) resolves correctly regardless of the caller's working directory,
// and works consistently whether this file runs as real ESM, is compiled to CommonJS by
// Babel, or is bundled by webpack (e.g. jsonresume-theme's publish bundle) - matching the
// existing pattern already used for `resume.json`/`letter.json` in `index.client.js`.
import packageJson from "../../package.json" with {type: "json"};
import resumeJson from "../resumes/resume.json" with {type: "json"};

export const renderHtml = (options = {}) => {
    const passedPrintable = options instanceof Resume ? options : options.passedPrintable;
    const {printableStylesPath, printableTemplatePath, ...renderLocals} = options;
    const printable = passedPrintable || Resume.fromResume(resumeJson);

    return genericRenderHtml({
        printableComponent: ResumeComponent,
        printableStylesPath: process.env.RESUME_STYLES_PATH || (typeof __RESUME_STYLES_PATH__ !== "undefined" && __RESUME_STYLES_PATH__ ? path.resolve(__RESUME_STYLES_PATH__) : null) || printableStylesPath || path.resolve("dist/styles.css"),
        printableTemplatePath: printableTemplatePath || path.resolve("../packages/views/templates/index.pug"),
        printable
    })({
        bundleName: "resume",
        pageUrl: process.env.PUBLISHED_RESUME_URL || (typeof __PUBLISHED_RESUME_URL__ !== "undefined" ? __PUBLISHED_RESUME_URL__ : ""),
        packageJson,
        printable,
        ...renderLocals
    });
};

export default renderHtml;
