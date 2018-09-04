import {Emoji} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import {createAction} from "redux-actions";
import {clearEmoji} from "../../../lib/actions/emoji/clearEmoji";
import {instantiateEmoji} from "../../../lib/actions/emoji/instantiateEmoji";
import {updateEmoji} from "../../../lib/actions/emoji/updateEmoji";
import reducer, {getEmoji, hasEmoji} from "../../../lib/data/emoji";

describe("emoji", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map();
    });

    it("reduces the current state for some other action", function () {
        const stubEmoji = Emoji.fromJS({id: "woof"});

        const otherAction = createAction("OTHER_ACTION");

        const instantiatedState = reducer(stubInitialState, otherAction(stubEmoji));
        expect(getEmoji(instantiatedState, stubEmoji.id)).to.eql(undefined);
        expect(hasEmoji(instantiatedState, stubEmoji.id)).to.eql(false);
    });

    describe("INSTANTIATE_EMOJI", function () {
        it("reduces the correct state", function () {
            const stubEmoji = Emoji.fromJS({id: "woof"});

            const instantiatedState = reducer(stubInitialState, instantiateEmoji(stubEmoji));
            expect(getEmoji(instantiatedState, stubEmoji.id)).to.eql(stubEmoji);
        });
    });

    describe("UPDATE_EMOJI", function () {
        it("reduces the correct state", function () {
            const stubEmoji = Emoji.fromJS({id: "woof"});

            const instantiatedState = reducer(stubInitialState, instantiateEmoji(stubEmoji));
            expect(getEmoji(instantiatedState, stubEmoji.id)).to.eql(stubEmoji);

            const updatedStubEmoji = stubEmoji.set({type: "emoji"});
            const updatedState = reducer(instantiatedState, updateEmoji(updatedStubEmoji));
            expect(getEmoji(updatedState, stubEmoji.id)).to.eql(updatedStubEmoji);
        });
    });

    describe("CLEAR_EMOJI", function () {
        it("reduces the correct state", function () {
            const stubEmoji = Emoji.fromJS({id: "woof"});

            const instantiatedState = reducer(stubInitialState, instantiateEmoji(stubEmoji));
            expect(getEmoji(instantiatedState, stubEmoji.id)).to.eql(stubEmoji);

            const clearedState = reducer(instantiatedState, clearEmoji(stubEmoji));
            expect(getEmoji(clearedState, stubEmoji.id)).to.eql(undefined);
        });
    });
});
