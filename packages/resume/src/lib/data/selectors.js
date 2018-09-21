import {selectors as jsxSelectors} from "@randy.tarampi/jsx";
import {getResumeVariant} from "./resume";

export const selectors = {
    ...jsxSelectors,

    getResumeVariant: (state, variant) => getResumeVariant(state.get("resume"), variant)
};

export default selectors;
