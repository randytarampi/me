import {renderHtml as genericRenderHtml} from "@randy.tarampi/printables/html.js";
import path from "path";
import {readFileSync} from "fs";

import ResumeComponent from "../public/views/serverApp.js";
import Resume from "./resume.js";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const resumeJson = JSON.parse(readFileSync("src/resumes/resume.json", "utf8"));

export const renderHtml = (options = {}) => {
    const passedPrintable = options instanceof Resume ? options : options.passedPrintable;
    const {printableStylesPath, printableTemplatePath, ...renderLocals} = options;
    const printable = passedPrintable || Resume.fromResume(resumeJson);

    return genericRenderHtml({
        printableComponent: ResumeComponent,
        printableStylesPath: process.env.RESUME_STYLES_PATH || (typeof __RESUME_STYLES_PATH__ !== "undefined" && __RESUME_STYLES_PATH__ ? path.resolve(__RESUME_STYLES_PATH__) : null) || printableStylesPath || path.resolve("dist/styles.css"),
        printableTemplatePath,
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
