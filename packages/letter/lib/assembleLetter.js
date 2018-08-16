import path from "path";
import Letter from "./letter";

export const assembleLetter = fileName => {
    const letterTemplate = require(`${__dirname}/../letters/${fileName}`);
    const letter = Letter.fromJS({
        id: path.basename(fileName, path.extname(fileName)),
        ...letterTemplate
    });
    return letter;
};

export default assembleLetter;
