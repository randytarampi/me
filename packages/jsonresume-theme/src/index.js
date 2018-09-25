import "@babel/polyfill";
import {renderHtml, Resume} from "@randy.tarampi/resume";
import config from "config";
import path from "path";

export const render = (resumeJson, pageSize) => {
    return renderHtml({
        printable: Resume.fromResume(resumeJson),
        pageSize,
        assetUrl: config && config.has("resume.assetUrl")
            ? config.get("resume.assetUrl")
            : "http://localhost:3000",
        printableStylesPath: path.join(__dirname, "../node_modules/@randy.tarampi/resume/dist/styles.css"),
        printableTemplatePath: path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug")
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
