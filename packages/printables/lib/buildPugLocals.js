import {buildPugLocals as genericBuildPugLocals} from "@randy.tarampi/views";
import packageJson from "../package.json";
import {renderCss} from "./renderCss";
import {getRenderedHelmet, renderJsx} from "./renderJsx";

export const buildPugLocalsBuilder = ({printableComponent, printableStylesPath}) => {
    const printableJsxRenderer = renderJsx(printableComponent);
    const css = renderCss(printableStylesPath);

    return renderLocals => {
        const content = printableJsxRenderer(renderLocals); // NOTE-RT: This needs to come *before* we call `getRenderedHelmet()
        const helmetContent = getRenderedHelmet();

        return genericBuildPugLocals({
            packageJson,
            content,
            css,
            helmetContent,
            environment: "printable",
            ...renderLocals
        });
    };
};

export default buildPugLocalsBuilder;

