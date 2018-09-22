import "@babel/polyfill";
import {renderHtml, Resume} from "@randy.tarampi/resume";

let config;

try {
    config = require("config");
} catch (error) {
    if (error.code !== "MODULE_NOT_FOUND") {
        throw error;
    }
}

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
