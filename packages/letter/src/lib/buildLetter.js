import baseLetter from "../letters/letter.json";
import Letter from "./letter";

export const buildLetter = (letterTemplate, id) => {
    const json = Object.assign({}, baseLetter, letterTemplate);
    const letter = Letter.fromJSON({
        ...json,
        id,
    });
    return letter;
};

export default buildLetter;
