import config from "config";
import path from "path";
import pug from "pug";
import packageJson from "../package.json";
import baseLetterJson from "./baseLetter";
import Letter from "./letter";
import renderCss from "./renderCss";
import renderJsx, {getRenderedHelmet} from "./renderJsx";

export const buildPugLocals = (letter, pageSize) => {
    return {
        bundleName: "letter",
        injectedBase: getRenderedHelmet().base.toString(),
        injectedTitle: getRenderedHelmet().title.toString(),
        injectedLink: getRenderedHelmet().link.toString(),
        injectedMeta: getRenderedHelmet().meta.toString(),
        injectedStyle: getRenderedHelmet().style.toString(),
        injectedScript: getRenderedHelmet().script.toString(),
        injectedNoScript: getRenderedHelmet().noscript.toString(),
        css: renderCss(),
        content: renderJsx({letter, pageSize}),
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

