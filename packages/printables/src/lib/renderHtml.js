import path from "path";
import pug from "pug";
import {buildPugLocalsBuilder} from "./buildPugLocals";

export const renderHtml = ({printableComponent, printableStylesPath, printable}) => {
    const printablePugLocalsBuilder = buildPugLocalsBuilder({printableComponent, printableStylesPath, printable});

    return renderLocals => {
        const pugLocals = printablePugLocalsBuilder(renderLocals);
        return pug.renderFile(path.join(__dirname, "../../node_modules/@randy.tarampi/views/templates/index.pug"), pugLocals);
    };
};

export default renderHtml;

