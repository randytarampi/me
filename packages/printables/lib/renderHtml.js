import {buildPugLocals as genericBuildPugLocals} from "@randy.tarampi/views";
import path from "path";
import pug from "pug";
import packageJson from "../package.json";
import renderCss from "./renderCss";
import renderJsx, {getRenderedHelmet} from "./renderJsx";

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

export const renderHtml = ({printableComponent, printableStylesPath, printable}) => {
    const printablePugLocalsBuilder = buildPugLocalsBuilder({printableComponent, printableStylesPath, printable});

    return renderLocals => {
        const pugLocals = printablePugLocalsBuilder(renderLocals);
        return pug.renderFile(path.join(__dirname, "../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
    };
};

export default renderHtml;

