import baseLetter from "../letters/default";
import Letter from "./letter";

export const buildLetter = (letterTemplate, id) => {
    const json = Object.assign({}, baseLetter, letterTemplate);
    const letter = Letter.fromResume({
        id,
        ...json
    });
    return letter;
};

export default buildLetter;
