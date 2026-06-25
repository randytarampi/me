const {Emoji} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {Map} = require("immutable");
const {createAction} = require("redux-actions");
const {clearEmoji} = require("../../../../../src/lib/actions/emoji/clearEmoji.js");
const {instantiateEmoji} = require("../../../../../src/lib/actions/emoji/instantiateEmoji.js");
const {updateEmoji} = require("../../../../../src/lib/actions/emoji/updateEmoji.js");
const reducer = require("../../../../../src/lib/data/emoji.js").default || require("../../../../../src/lib/data/emoji.js");
const {getEmoji, hasEmoji} = require("../../../../../src/lib/data/emoji.js");

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
