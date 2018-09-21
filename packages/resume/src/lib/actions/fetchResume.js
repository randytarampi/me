import {isUrlStateLoading, setErrorCreator} from "@randy.tarampi/jsx";
import {createAction} from "redux-actions";
import fetchResume, {buildFetchUrlForVariant} from "../api/fetchResume";
import selectors from "../data/selectors";

export const FETCHING_RESUME_FAILURE = "FETCHING_RESUME_FAILURE";
export const FETCHING_RESUME_SUCCESS = "FETCHING_RESUME_SUCCESS";
export const FETCHING_RESUME_CANCELLED = "FETCHING_RESUME_CANCELLED";
export const FETCHING_RESUME = "FETCHING_RESUME";

export const fetchResumeCreator = variant => (dispatch, getState) => {
    const state = getState();
    const fetchUrl = buildFetchUrlForVariant(variant);
    const urlState = selectors.getApiStateForUrl(state, fetchUrl);
    const isLoading = isUrlStateLoading(urlState);

    if (isLoading) {
        dispatch(fetchingResumeCancelled({
            fetchUrl,
            variant,
            isLoading
        }));
        return Promise.resolve();
    }

    const alreadyLoadedVariant = selectors.getResumeVariant(state, variant);
    if (alreadyLoadedVariant) {
        dispatch(fetchingResumeCancelled({
            fetchUrl,
            variant,
            resume: alreadyLoadedVariant
        }));
        return Promise.resolve(alreadyLoadedVariant);
    }

    dispatch(fetchingResume({
        fetchUrl,
        variant
    }));

    return fetchResume(variant)
        .then(resume => {
            dispatch(fetchingResumeSuccess({
                fetchUrl,
                variant,
                resume
            }));

            if (!resume) {
                dispatch(setErrorCreator(undefined, "ENORESUME"));
            }

            return resume;
        })
        .catch(error => {
            dispatch(fetchingResumeFailure({
                fetchUrl,
                variant,
                error
            }));
            dispatch(setErrorCreator(error, "EFETCH"));

            throw error;
        });
};

export default fetchResumeCreator;

export const fetchingResume = createAction(FETCHING_RESUME);
export const fetchingResumeCancelled = createAction(FETCHING_RESUME_CANCELLED);
export const fetchingResumeSuccess = createAction(FETCHING_RESUME_SUCCESS);
export const fetchingResumeFailure = createAction(FETCHING_RESUME_FAILURE);
