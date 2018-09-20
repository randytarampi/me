import {renderHtml as genericRenderHtml} from "@randy.tarampi/printables";
import config from "config";
import path from "path";
import packageJson from "../package";
import LetterComponent from "../public/views/serverApp";

export const renderHtml = ({printable, ...renderLocals} = {}) => {
    return genericRenderHtml({
        printableComponent: LetterComponent,
        printableStylesPath: path.join(__dirname, "../dist/styles.css"),
        printable
    })({
        bundleName: "letter",
        pageUrl: config.get("letter.publishUrl"),
        packageJson,
        printable,
        ...renderLocals
    });
};

export default renderHtml;
