import {selectors as jsxSelectors} from "@randy.tarampi/jsx";
import {getLetterVariant} from "./letter";

export const selectors = {
    ...jsxSelectors,

    getLetterVariant: (state, variant) => getLetterVariant(state.get("letter"), variant)
};

export default selectors;
