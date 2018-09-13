import {selectors as jsxSelectors} from "../../../jsx/esm";
import {getResumeVariant} from "./resume";

export const selectors = {
    ...jsxSelectors,

    getResumeVariant: (state, variant) => getResumeVariant(state.get("resume"), variant)
};

export default selectors;
