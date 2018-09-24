import {renderHtml as genericRenderHtml} from "@randy.tarampi/printables/html";
import path from "path";
import packageJson from "../../package";
import LetterComponent from "../public/views/serverApp";

export const renderHtml = ({printable, printableStylesPath, ...renderLocals} = {}) => {
    return genericRenderHtml({
        printableComponent: LetterComponent,
        printableStylesPath: process.env.LETTER_STYLES_PATH || __LETTER_STYLES_PATH__ && path.join(__dirname, __LETTER_STYLES_PATH__) || printableStylesPath || path.join(__dirname, "../../dist/styles.css"),
        printable
    })({
        bundleName: "letter",
        pageUrl: __PUBLISHED_LETTER_URL__,
        packageJson,
        printable,
        ...renderLocals
    });
};

export default renderHtml;
