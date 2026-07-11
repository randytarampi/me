import {Map} from "immutable";
import {createSelector} from "reselect";
import {FETCHING_RESUME_SUCCESS} from "../actions/fetchResume.js";
import Resume from "../resume.js";
// NOTE-RT: a static JSON import (rather than `readFileSync` + a computed `__dirname`/
// `import.meta.url` path) resolves correctly regardless of the caller's working directory,
// and works consistently whether this file runs as real ESM, is compiled to CommonJS by
// Babel, or is bundled by webpack - matching the existing pattern already used for
// `resume.json`/`letter.json` in `index.client.js`.
import defaultResume from "../../resumes/resume.json" with {type: "json"};

const defaultVariant = "resume";
const defaultState = Map({
    resumes: Map({resume: Resume.fromResume(defaultResume)})
});

export const resumeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCHING_RESUME_SUCCESS: {
            if (action.payload.resume) {
                return state.set("resumes", state.get("resumes").set(
                    action.payload.variant || defaultVariant,
                    action.payload.resume
                ));
            }

            return state;
        }

        default:
            return state;
    }
};

export default resumeReducer;

export const getResumes = state => state.get("resumes");

export const getResume = createSelector(
    getResumes,
    resumes => resumes.first() || null
);

const getVariant = (state, variant) => variant;

export const getResumeVariant = createSelector(
    [getResumes, getVariant],
    (resumes, variant) => {
        const resume = resumes.get(variant);

        return resume ? resume : null;
    }
);
