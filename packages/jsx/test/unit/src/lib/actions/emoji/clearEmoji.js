const {Emoji} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const clearEmoji = require("../../../../../../src/lib/actions/emoji/clearEmoji.js").default || require("../../../../../../src/lib/actions/emoji/clearEmoji.js");
const {CLEAR_EMOJI} = require("../../../../../../src/lib/actions/emoji/clearEmoji.js");

describe("clearEmoji", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubEmoji;

    beforeEach(function () {
        stubMiddleware = [thunk];
        stubEmoji = Emoji.fromJS({id: "woof"});
        stubInitialState = Map({
            emoji: Map({
                [stubEmoji.id]: stubEmoji
            })
        });
        mockStore = configureStore(stubMiddleware);
        stubStore = mockStore(stubInitialState);
    });

    describe("CLEAR_EMOJI", function () {
        it("is dispatched with the expected payload (clears emoji)", function () {
            stubStore.dispatch(clearEmoji(stubEmoji));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: CLEAR_EMOJI,
                payload: stubEmoji
            }]);
        });

        it("is dispatched with the expected payload (no emoji to clear)", function () {
            stubStore.dispatch(clearEmoji(stubEmoji.set("id", "meow")));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(0);
            expect(actions).to.eql([]);
        });
    });
});
