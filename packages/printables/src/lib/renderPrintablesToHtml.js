import fs from "fs";
import path from "path";
import {renderPrintablesHtml} from "./renderPrintablesHtml.js";

export const renderPrintablesToHtml = ({
                                           printableComponent,
                                           printableStylesPath,
                                           printableBuilder,
                                           printableTemplateDirectory,
                                           printableRenderOptions,
                                           printableDestinationDirectory
                                       }) => {
    // NOTE-RT: `fs.writeFile` doesn't create missing parent directories - it just fails with `ENOENT`.
    // NOTE-RT: Ensure the destination directory exists before we ever try to write into it.
    return fs.promises.mkdir(printableDestinationDirectory, {recursive: true})
        .then(() => renderPrintablesHtml({
            printableComponent,
            printableStylesPath,
            printableBuilder,
            printableTemplateDirectory,
            printableRenderOptions
        }))
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
