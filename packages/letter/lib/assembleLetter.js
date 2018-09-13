import path from "path";
import {buildLetter} from "./buildLetter";

export const assembleLetter = filePath => {
    const requiredFile = require(filePath);
    const letterTemplate = requiredFile.default || requiredFile;

    return buildLetter(letterTemplate, path.basename(filePath, path.extname(filePath)));
};

export default assembleLetter;
