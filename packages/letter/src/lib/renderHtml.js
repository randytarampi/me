import {renderHtml as genericRenderHtml} from "../../../printables/src/lib/html.js";
import path, {dirname} from "path";
import {readFileSync} from "fs";
import {fileURLToPath} from "url";

import LetterComponent from "../public/views/serverApp.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

export const renderHtml = (options = {}) => {
    const printable = options.printable || options;
    const {printableStylesPath, printableTemplatePath, ...renderLocals} = options;

    return genericRenderHtml({
        printableComponent: LetterComponent,
        printableStylesPath: process.env.LETTER_STYLES_PATH || (typeof __LETTER_STYLES_PATH__ !== "undefined" && __LETTER_STYLES_PATH__ ? path.join(__dirname, __LETTER_STYLES_PATH__) : null) || printableStylesPath || path.join(__dirname, "../../dist/styles.css"),
        printableTemplatePath,
        printable
    })({
        bundleName: "letter",
        pageUrl: process.env.PUBLISHED_LETTER_URL || (typeof __PUBLISHED_LETTER_URL__ !== "undefined" ? __PUBLISHED_LETTER_URL__ : ""),
        packageJson,
        printable,
        ...renderLocals
    });
};

export default renderHtml;
