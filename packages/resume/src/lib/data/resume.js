import {Map} from "immutable";
import {createSelector} from "reselect";
import defaultResume from "../../resumes/resume.json";
import {FETCHING_RESUME_SUCCESS} from "../actions/fetchResume";
import Resume from "../resume";

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
