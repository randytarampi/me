import path from "path";
import {createRequire} from "module";

const moduleRequire = typeof require === "function"
    ? require
    : createRequire(path.join(process.cwd(), "noop.js"));

export const assemblePrintable = printableBuilder => filePath => {
    const requiredFile = moduleRequire(filePath);
    const printableJson = requiredFile.default || requiredFile;

    return printableBuilder(printableJson, path.basename(filePath, path.extname(filePath)));
};

export default assemblePrintable;
