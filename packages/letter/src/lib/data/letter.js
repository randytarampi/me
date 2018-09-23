import {Map, Set} from "immutable";
import {createSelector} from "reselect";
import defaultLetter from "../../../letter";
import {FETCHING_LETTER_SUCCESS} from "../actions/fetchLetter";
import Letter from "../letter";

const defaultState = Map({
    letters: Set([
        Map({variant: "default", letter: Letter.fromJSON(defaultLetter)})
    ])
});

export const letterReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCHING_LETTER_SUCCESS: {
            if (action.payload.letter) {
                return state.set("letters", state.get("letters").add(Map({
                    variant: action.payload.variant || "default",
                    letter: action.payload.letter
                })));
            }

            return state;
        }

        default:
            return state;
    }
};

export default letterReducer;

const getLetterVariantPairs = state => state.get("letters");

export const getLetters = createSelector(
    getLetterVariantPairs,
    letterVariantPairs => letterVariantPairs.map(letterVariantPair => letterVariantPair.get("letter"))
);

export const getLetter = createSelector(
    getLetterVariantPairs,
    letterVariantPairs => {
        const anyLetterVariantPair = letterVariantPairs.first();
        return anyLetterVariantPair ? anyLetterVariantPair.get("letter") : null;
    }
);

const getVariant = (state, variant) => variant;

export const getLetterVariant = createSelector(
    [getLetterVariantPairs, getVariant],
    (letterVariantPairs, variant) => {
        const variantLetterPair = letterVariantPairs.find(variantLetterPair => variantLetterPair.get("variant") === variant);

        return variantLetterPair ? variantLetterPair.get("letter") : null;
    }
);
