import {selectors as jsxSelectors} from "@randy.tarampi/jsx/src/lib/index.jsx";
import {getLetterVariant} from "./letter.js";

export const selectors = {
    ...jsxSelectors,

    getLetterVariant: (state, variant) => getLetterVariant(state.get("letter"), variant)
};

export default selectors;
