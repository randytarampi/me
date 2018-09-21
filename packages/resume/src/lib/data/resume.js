import {Map, Set} from "immutable";
import {createSelector} from "reselect";
import defaultResume from "../../resumes";
import {FETCHING_RESUME_SUCCESS} from "../actions/fetchResume";
import Resume from "../resume";

const defaultState = Map({
    resumes: Set([
        Map({variant: "default", resume: Resume.fromResume(defaultResume)})
    ])
});

export const resumeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCHING_RESUME_SUCCESS: {
            if (action.payload.resume) {
                return state.set("resumes", state.get("resumes").add(Map({
                    variant: action.payload.variant || "default",
                    resume: action.payload.resume
                })));
            }

            return state;
        }

        default:
            return state;
    }
};

export default resumeReducer;

const getResumeVariantPairs = state => state.get("resumes");

export const getResumes = createSelector(
    getResumeVariantPairs,
    resumeVariantPairs => resumeVariantPairs.map(resumeVariantPair => resumeVariantPair.get("resume"))
);

export const getResume = createSelector(
    getResumeVariantPairs,
    resumeVariantPairs => {
        const anyResumeVariantPair = resumeVariantPairs.first();
        return anyResumeVariantPair ? anyResumeVariantPair.get("resume") : null;
    }
);

const getVariant = (state, variant) => variant;

export const getResumeVariant = createSelector(
    [getResumeVariantPairs, getVariant],
    (resumeVariantPairs, variant) => {
        const variantResumePair = resumeVariantPairs.find(variantResumePair => variantResumePair.get("variant") === variant);

        return variantResumePair ? variantResumePair.get("resume") : null;
    }
);
