import fs from "fs";
import path from "path";
import {assemblePrintables} from "./assemblePrintables";
import {renderHtml} from "./renderHtml";
import {renderPdf} from "./renderPdf";

export const renderPrintablesHtml = ({
                                         printableComponent,
                                         printableStylesPath,
                                         printableBuilder,
                                         printableTemplateDirectory,
                                         printableRenderOptions
                                     }) => {
    const htmlRenderer = renderHtml({
        printableComponent,
        printableStylesPath
    });

    return assemblePrintables(printableBuilder)(printableTemplateDirectory)
        .then(printables => Promise.all(printables.map(printable => new Promise((resolve, reject) => {
            let printableHtml;

            try {
                printableHtml = htmlRenderer({
                    printable,
                    ...printableRenderOptions
                });
            } catch (error) {
                return reject(error);
            }

            return resolve({
                printableHtml,
                printable
            });
        }))));
};

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
                return fs.writeFile(path.join(printableDestinationDirectory, `${printable.fileName}.html`), printableHtml, error => {
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

export const renderPrintablesToPdf = ({
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
        .then(printableHtmlPairs => Promise.all(printableHtmlPairs.map(({printableHtml, printable}) => renderPdf({printable, printableHtml, printableDestinationDirectory}))));
};
