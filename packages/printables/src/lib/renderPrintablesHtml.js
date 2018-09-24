import {assemblePrintables} from "./assemblePrintables";
import {renderHtml} from "./renderHtml";

export const renderPrintableHtml = (htmlRenderer, printableRenderOptions) => printable => {
    return Promise.resolve({
        printableHtml: htmlRenderer({
            printable,
            ...printableRenderOptions
        }),
        printable
    });
};

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
    const printableRenderer = renderPrintableHtml(htmlRenderer, printableRenderOptions);

    return assemblePrintables(printableBuilder)(printableTemplateDirectory)
        .then(printables => Promise.all(printables.map(printableRenderer)));
};

export default renderPrintablesHtml;
