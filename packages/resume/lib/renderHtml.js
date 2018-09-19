import {buildPugLocals as genericBuildPugLocals} from "@randy.tarampi/views";
import config from "config";
import path from "path";
import pug from "pug";
import packageJson from "../package.json";
import defaultResumeJson from "../resumes/default";
import renderCss from "./renderCss";
import renderJsx, {getRenderedHelmet} from "./renderJsx";
import Resume from "./resume";

export const buildPugLocals = (resume, pageSize) => {
    const content = renderJsx({resume, pageSize}); // NOTE-RT: This needs to come *before* we call `getRenderedHelmet()
    const helmetContent = getRenderedHelmet();

    return genericBuildPugLocals({
        bundleName: "resume",
        packageJson,
        content,
        css: renderCss(),
        helmetContent,
        pageUrl: config.get("resume.publishUrl"),
        environment: "printable"
    });
};

export default (resume = Resume.fromResume(defaultResumeJson), pageSize = process.env.RESUME_PDF_SIZE) => {
    const pugLocals = buildPugLocals(resume, pageSize);
    return pug.renderFile(path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
};

