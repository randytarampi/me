import {renderHtml as genericRenderHtml} from "@randy.tarampi/printables";
import path from "path";
import packageJson from "../../package";
import ResumeComponent from "../public/views/serverApp";
import resumeJson from "../resumes";
import Resume from "./resume";

export const renderHtml = ({passedPrintable, ...renderLocals} = {}) => {
    const printable = passedPrintable || Resume.fromResume(resumeJson);

    return genericRenderHtml({
        printableComponent: ResumeComponent,
        printableStylesPath: path.join(__dirname, "../../dist/styles.css"),
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
