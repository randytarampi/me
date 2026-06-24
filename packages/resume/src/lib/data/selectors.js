import {selectors as jsxSelectors} from "@randy.tarampi/jsx/src/lib/index.jsx";
import {getResumeVariant} from "./resume.js";

export const selectors = {
    ...jsxSelectors,

    getResumeVariant: (state, variant) => getResumeVariant(state.get("resume"), variant)
};

export default selectors;
