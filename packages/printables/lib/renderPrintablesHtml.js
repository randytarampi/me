import {assemblePrintables} from "./assemblePrintables";
import {renderHtml} from "./renderHtml";

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
        .then(printables => Promise.all(printables.map(printable => {
            return {
                printableHtml: htmlRenderer({
                    printable,
                    ...printableRenderOptions
                }),
                printable
            };
        })));
};

export default renderPrintablesHtml;
