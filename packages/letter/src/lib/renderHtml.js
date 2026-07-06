import {renderHtml as genericRenderHtml} from "../../../printables/src/lib/html.js";
import path from "path";

import LetterComponent from "../public/views/serverApp.jsx";
// NOTE-RT: a static JSON import (rather than `readFileSync` + a computed `__dirname`/
// `import.meta.url` path) resolves correctly regardless of the caller's working directory,
// and works consistently whether this file runs as real ESM, is compiled to CommonJS by
// Babel, or is bundled by webpack (e.g. jsonresume-theme's publish bundle) - matching the
// existing pattern already used for `resume.json`/`letter.json` in `index.client.js`.
import packageJson from "../../package.json" with {type: "json"};

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
