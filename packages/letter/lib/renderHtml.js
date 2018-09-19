import {buildPugLocals as genericBuildPugLocals} from "@randy.tarampi/views";
import path from "path";
import pug from "pug";
import config from "config";
import baseLetterJson from "../letters/default";
import packageJson from "../package.json";
import Letter from "./letter";
import renderCss from "./renderCss";
import renderJsx, {getRenderedHelmet} from "./renderJsx";

export const buildPugLocals = (letter, pageSize) => {
    const content = renderJsx({letter, pageSize}); // NOTE-RT: This needs to come *before* we call `getRenderedHelmet()
    const helmetContent = getRenderedHelmet();

    return genericBuildPugLocals({
        bundleName: "resume",
        packageJson,
        content,
        css: renderCss(),
        helmetContent,
        pageUrl: config.get("letter.publishUrl"),
        environment: "printable"
    });
};

export default (letter = Letter.fromResume(baseLetterJson), pageSize = process.env.LETTER_PDF_SIZE) => {
    const pugLocals = buildPugLocals(letter, pageSize);
    return pug.renderFile(path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
};

