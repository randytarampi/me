import "@babel/polyfill";
import {renderHtml, Resume} from "@randy.tarampi/resume";
import config from "config";
import path from "path";

process.env.RESUME_STYLES_PATH = process.env.RESUME_STYLES_PATH || path.join(__dirname, "../dist/styles.css");
process.env.PRINTABLE_TEMPLATE_PATH = process.env.PRINTABLE_TEMPLATE_PATH || path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug");

export const render = (resumeJson, pageSize) => {
    return renderHtml({
        printable: Resume.fromResume(resumeJson),
        pageSize
    });
};

export const pdfRenderOptions = {
    format: process.env.RESUME_PDF_SIZE || "Letter",
    mediaType: "print"
};

export const pdfRenderExpectations = config && config.has("resume.expectations")
    ? config.get("resume.expectations")
    : {
        pages: 1
    };

// NOTE-RT: These exports are built to conform to the expectations of https://github.com/jsonresume/resume-cli
export default {
    render,
    pdfRenderOptions,
    pdfRenderExpectations
};
