import config from "config";
import path from "path";
import baseLetter from "./baseLetter";
import Letter from "./letter";

export const assembleLetter = filePath => {
    const requiredFile = require(filePath);
    const letterTemplate = requiredFile.default || requiredFile;

    const json = Object.assign({}, {sender: config.get("me.basics")}, baseLetter, letterTemplate);
    const letter = Letter.fromJS({
        id: path.basename(filePath, path.extname(filePath)),
        ...json
    });
    return letter;
};

export default assembleLetter;
