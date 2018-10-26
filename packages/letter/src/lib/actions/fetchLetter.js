import {isUrlStateLoading, setErrorCreator} from "@randy.tarampi/jsx";
import {createAction} from "redux-actions";
import fetchLetter, {buildFetchUrlForVariant} from "../api/fetchLetter";
import selectors from "../data/selectors";

export const FETCHING_LETTER_FAILURE = "FETCHING_LETTER_FAILURE";
export const FETCHING_LETTER_SUCCESS = "FETCHING_LETTER_SUCCESS";
export const FETCHING_LETTER_CANCELLED = "FETCHING_LETTER_CANCELLED";
export const FETCHING_LETTER = "FETCHING_LETTER";

export const fetchLetterCreator = variant => (dispatch, getState) => {
    const state = getState();
    const fetchUrl = buildFetchUrlForVariant(variant);
    const urlState = selectors.getApiStateForUrl(state, fetchUrl);
    const isLoading = isUrlStateLoading(urlState);

    if (isLoading) {
        dispatch(fetchingLetterCancelled({
            fetchUrl,
            variant,
            isLoading
        }));
        return Promise.resolve();
    }

    dispatch(fetchingLetter({
        fetchUrl,
        variant
    }));

    return fetchLetter(variant)
        .then(letter => {
            dispatch(fetchingLetterSuccess({
                fetchUrl,
                variant,
                letter
            }));

            if (!letter) {
                dispatch(setErrorCreator(undefined, "ENOLETTER"));
            }

            return letter;
        })
        .catch(error => {
            dispatch(fetchingLetterFailure({
                fetchUrl,
                variant,
                error
            }));

            const alreadyLoadedVariant = selectors.getLetterVariant(state, variant);
            if (alreadyLoadedVariant) {
                dispatch(fetchingLetterCancelled({
                    fetchUrl,
                    variant,
                    letter: alreadyLoadedVariant
                }));
                return Promise.resolve(alreadyLoadedVariant);
            }

            dispatch(setErrorCreator(error, "EFETCH"));

            throw error;
        });
};

export default fetchLetterCreator;

export const fetchingLetter = createAction(FETCHING_LETTER);
export const fetchingLetterCancelled = createAction(FETCHING_LETTER_CANCELLED);
export const fetchingLetterSuccess = createAction(FETCHING_LETTER_SUCCESS);
export const fetchingLetterFailure = createAction(FETCHING_LETTER_FAILURE);
