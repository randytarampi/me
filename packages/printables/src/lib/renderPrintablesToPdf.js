import {renderPdf} from "./renderPdf.js";
import {renderPrintablesHtml} from "./renderPrintablesHtml.js";

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
        .then(printableHtmlPairs => Promise.all(printableHtmlPairs.map(({printableHtml, printable}) => renderPdf({
            printable,
            printableHtml,
            printableDestinationDirectory
        }))));
};

export default renderPrintablesToPdf;
