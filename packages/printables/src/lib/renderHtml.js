import path from "path";
import pug from "pug";
import {buildPugLocalsBuilder} from "./buildPugLocals.js";

export const renderHtml = ({printableComponent, printableStylesPath, printableTemplatePath, printable}) => {
    const printablePugLocalsBuilder = buildPugLocalsBuilder({printableComponent, printableStylesPath, printable});

    return renderLocals => {
        const pugLocals = printablePugLocalsBuilder(renderLocals);
        return pug.renderFile(process.env.PRINTABLE_TEMPLATE_PATH || (typeof __PRINTABLE_TEMPLATE_PATH__ !== "undefined" && __PRINTABLE_TEMPLATE_PATH__ ? path.resolve(__PRINTABLE_TEMPLATE_PATH__) : null) || printableTemplatePath || path.resolve("../views/templates/index.pug"), pugLocals);
    };
};

export default renderHtml;
