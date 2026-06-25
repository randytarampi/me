import * as viewsModule from "../../../views/src/lib/index.js";
import {renderCss} from "./renderCss.js";
import {getRenderedHelmet, renderJsx} from "./renderJsx.js";

export const buildPugLocalsBuilder = ({printableComponent, printableStylesPath}) => {
    const printableJsxRenderer = renderJsx(printableComponent);
    const css = renderCss(printableStylesPath);

    return renderLocals => {
        const content = printableJsxRenderer(renderLocals); // NOTE-RT: This needs to come *before* we call `getRenderedHelmet()
        const helmetContent = getRenderedHelmet();

        return viewsModule.buildPugLocals({
            content,
            css,
            helmetContent,
            environment: "printable",
            ...renderLocals
        });
    };
};

export default buildPugLocalsBuilder;
