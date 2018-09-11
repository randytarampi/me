import config from "config";
import path from "path";
import pug from "pug";
import packageJson from "../package.json";
import baseLetterJson from "./baseLetter";
import Letter from "./letter";
import renderCss from "./renderCss";
import renderJsx, {getRenderedHelmet} from "./renderJsx";

export const buildPugLocals = (letter, pageSize) => {
    const content = renderJsx({letter, pageSize}); // NOTE-RT: This needs to come *before* we call `getRenderedHelmet()
    const helmetContent = getRenderedHelmet();

    return {
        bundleName: "letter",
        content,
        css: renderCss(),
        injectedBase: helmetContent.base.toString(),
        injectedTitle: helmetContent.title.toString(),
        injectedLink: helmetContent.link.toString(),
        injectedMeta: helmetContent.meta.toString(),
        injectedStyle: helmetContent.style.toString(),
        injectedScript: helmetContent.script.toString(),
        injectedNoScript: helmetContent.noscript.toString(),
        assetUrl: config.get("assetUrl"),
        sentryDsn: config.get("sentryDsn"),
        gtm: config.get("gtm"),
        environment: process.env.NODE_ENV || "local",
        version: packageJson.version,
        logger: JSON.stringify(null)
    };
};

export default (letter = Letter.fromJSON(baseLetterJson), pageSize = process.env.LETTER_PDF_SIZE) => {
    const pugLocals = buildPugLocals(letter, pageSize);
    return pug.renderFile(path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
};

