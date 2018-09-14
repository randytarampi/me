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

    return {
        bundleName: "resume",
        content,
        css: renderCss(),
        injectedBase: helmetContent.base.toString(),
        injectedTitle: helmetContent.title.toString(),
        injectedLink: helmetContent.link.toString(),
        injectedMeta: helmetContent.meta.toString(),
        injectedStyle: helmetContent.style.toString(),
        injectedScript: helmetContent.script.toString(),
        injectedNoScript: helmetContent.noscript.toString(),
        assetUrl: config.get("www.assetUrl"),
        sentryDsn: config.get("sentryDsn"),
        gtm: config.get("gtm"),
        environment: process.env.NODE_ENV || "local",
        version: packageJson.version,
        logger: JSON.stringify(null)
    };
};

export default (resume = Resume.fromResume(defaultResumeJson), pageSize = process.env.RESUME_PDF_SIZE) => {
    const pugLocals = buildPugLocals(resume, pageSize);
    return pug.renderFile(path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
};

