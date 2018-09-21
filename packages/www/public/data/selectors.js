import {selectors as jsxSelectors} from "@randy.tarampi/jsx";
import {selectors as letterSelectors} from "@randy.tarampi/letter";
import {selectors as resumeSelectors} from "jsonresume-theme-randytarampi";

export const selectors = {
    ...jsxSelectors,
    ...resumeSelectors,
    ...letterSelectors
};

export default selectors;
