import {expect} from "chai";
import {Map, Set} from "immutable";
import {createAction} from "redux-actions";
import {fetchingLetterSuccess} from "../../../../../src/lib/actions/fetchLetter";
import reducer, {getLetter, getLetters} from "../../../../../src/lib/data/letter";

describe("letter", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map({
            letters: new Set([])
        });
    });

    it("reduces the current state for some other action", function () {
        const stubLetter = {woof: "meow"};
        const stubPayload = {
            letter: stubLetter
        };
        const otherAction = createAction("OTHER_ACTION");

        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const letter = getLetter(updatedState);
        expect(letter).to.not.be.ok;
        expect(letter).to.eql(null);
    });

    describe("FETCHING_LETTER_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubLetter = {woof: "meow"};
            const stubPayload = {
                letter: stubLetter
            };

            const updatedState = reducer(stubInitialState, fetchingLetterSuccess(stubPayload));
            const letter = getLetter(updatedState);
            expect(letter).to.eql(stubLetter);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubLetter = {woof: "meow"};
            const stubPayload = {
                letter: stubLetter
            };
            const stubLoadedLetter = {rawr: "roar"};

            stubInitialState = Map({
                letters: new Set([Map({variant: "grr", letter: stubLoadedLetter})])
            });
            const updatedState = reducer(stubInitialState, fetchingLetterSuccess(stubPayload));
            const letters = getLetters(updatedState);
            expect(letters.toArray()).to.eql([
                stubLoadedLetter,
                stubLetter
            ]);
        });

        it("reduces the correct state (does nothing if no letter to add)", function () {
            const stubPayload = {};
            const stubLoadedLetter = {rawr: "roar"};

            stubInitialState = Map({
                letters: new Set([Map({variant: "grr", letter: stubLoadedLetter})])
            });
            const updatedState = reducer(stubInitialState, fetchingLetterSuccess(stubPayload));
            const letter = getLetter(updatedState);
            expect(letter).to.eql({rawr: "roar"});
        });
    });
});
