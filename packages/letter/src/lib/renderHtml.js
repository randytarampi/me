import {renderHtml as genericRenderHtml} from "@randy.tarampi/printables";
import path from "path";
import packageJson from "../../package";
import LetterComponent from "../public/views/serverApp";

export const renderHtml = ({printable, ...renderLocals} = {}) => {
    return genericRenderHtml({
        printableComponent: LetterComponent,
        printableStylesPath: path.join(__dirname, "../../dist/styles.css"),
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
