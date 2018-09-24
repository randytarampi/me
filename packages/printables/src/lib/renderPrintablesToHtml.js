import fs from "fs";
import path from "path";
import {renderPrintablesHtml} from "./renderPrintablesHtml";

export const renderPrintablesToHtml = ({
                                           printableComponent,
                                           printableStylesPath,
                                           printableBuilder,
                                           printableTemplateDirectory,
                                           printableRenderOptions,
                                           printableDestinationDirectory
                                       }) => {
    return renderPrintablesHtml({
        printableComponent,
        printableStylesPath,
        printableBuilder,
        printableTemplateDirectory,
        printableRenderOptions
    })
        .then(printableHtmlPairs => Promise.all(printableHtmlPairs.map(({printableHtml, printable}) => new Promise((resolve, reject) => {
            try {
                return fs.writeFile(path.join(printableDestinationDirectory, `${printable.filename}.html`), printableHtml, error => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        }))));
};

export default renderPrintablesToHtml;
