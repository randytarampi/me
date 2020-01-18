import {Map} from "immutable";
import {createSelector} from "reselect";
import defaultLetter from "../../letters/letter.json";
import {FETCHING_LETTER_SUCCESS} from "../actions/fetchLetter";
import Letter from "../letter";

const defaultVariant = "letter";
const defaultState = Map({
    letters: Map({[defaultVariant]: Letter.fromJSON(defaultLetter)})
});

export const letterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCHING_LETTER_SUCCESS: {
            if (action.payload.letter) {
                return state.set("letters", state.get("letters").set(
                    action.payload.variant || defaultVariant,
                    action.payload.letter
                ));
            }

            return state;
        }

        default:
            return state;
    }
};

export default letterReducer;

export const getLetters = state => state.get("letters");

export const getLetter = createSelector(
    getLetters,
    letters => letters.first() || null
);

const getVariant = (state, variant) => variant;

export const getLetterVariant = createSelector(
    [getLetters, getVariant],
    (letters, variant) => {
        const letter = letters.get(variant);

        return letter ? letter : null;
    }
);
