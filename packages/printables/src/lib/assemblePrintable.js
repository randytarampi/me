import path from "path";

export const assemblePrintable = printableBuilder => filePath => {
    const requiredFile = require(filePath);
    const printableJson = requiredFile.default || requiredFile;

    return printableBuilder(printableJson, path.basename(filePath, path.extname(filePath)));
};

export default assemblePrintable;
