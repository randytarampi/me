import {renderHtml as genericRenderHtml} from "@randy.tarampi/printables/html";
import path from "path";
import packageJson from "../../package";
import ResumeComponent from "../public/views/serverApp";
import resumeJson from "../resumes/resume.json";
import Resume from "./resume";

export const renderHtml = ({passedPrintable, printableStylesPath, ...renderLocals} = {}) => {
    const printable = passedPrintable || Resume.fromResume(resumeJson);

    return genericRenderHtml({
        printableComponent: ResumeComponent,
        printableStylesPath: process.env.RESUME_STYLES_PATH || __RESUME_STYLES_PATH__ && path.join(__dirname, __RESUME_STYLES_PATH__) || printableStylesPath || path.join(__dirname, "../../dist/styles.css"),
        printable
    })({
        bundleName: "resume",
        pageUrl: __PUBLISHED_RESUME_URL__,
        packageJson,
        printable,
        ...renderLocals
    });
};

export default renderHtml;
