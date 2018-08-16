import config from "config";
import path from "path";
import pug from "pug";
import packageJson from "../package.json";
import resumeJson from "../resume.json";
import renderCss from "./renderCss";
import renderJsx, {renderedHelmet} from "./renderJsx";

export const buildPugLocals = (resume, pageSize) => {
    return {
        bundleName: "resume",
        injectedBase: renderedHelmet.base.toString(),
        injectedTitle: renderedHelmet.title.toString(),
        injectedLink: renderedHelmet.link.toString(),
        injectedMeta: renderedHelmet.meta.toString(),
        injectedStyle: renderedHelmet.style.toString(),
        injectedScript: renderedHelmet.script.toString(),
        injectedNoScript: renderedHelmet.noscript.toString(),
        css: renderCss(),
        content: renderJsx({resume, pageSize}),
        assetUrl: config.get("assetUrl"),
        sentryDsn: config.get("sentryDsn"),
        gtm: config.get("gtm"),
        environment: process.env.NODE_ENV || "local",
        version: packageJson.version
    };
};

export default (resume = resumeJson, pageSize = process.env.RESUME_PDF_SIZE) => {
    const pugLocals = buildPugLocals(resume, pageSize);
    return pug.renderFile(path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
};

