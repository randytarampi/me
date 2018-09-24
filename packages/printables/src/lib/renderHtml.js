import path from "path";
import pug from "pug";
import {buildPugLocalsBuilder} from "./buildPugLocals";

export const renderHtml = ({printableComponent, printableStylesPath, printableTemplatePath, printable}) => {
    const printablePugLocalsBuilder = buildPugLocalsBuilder({printableComponent, printableStylesPath, printable});

    return renderLocals => {
        const pugLocals = printablePugLocalsBuilder(renderLocals);
        return pug.renderFile(process.env.PRINTABLE_TEMPLATE_PATH || __PRINTABLE_TEMPLATE_PATH__ && path.join(__dirname, __PRINTABLE_TEMPLATE_PATH__) || printableTemplatePath || path.join(__dirname, "../../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
    };
};

export default renderHtml;

