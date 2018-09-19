import config from "config";
import baseLetter from "../letters/default";
import Letter from "./letter";

export const buildLetter = (letterTemplate, id) => {
    const json = Object.assign({}, baseLetter, letterTemplate);
    const letter = Letter.fromJSON({
        renderExpectations: config.get("letter.expectations"),
        ...json,
        id,
    });
    return letter;
};

export default buildLetter;
