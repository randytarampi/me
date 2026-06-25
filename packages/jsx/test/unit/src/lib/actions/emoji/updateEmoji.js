const {Emoji} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const updateEmoji = require("../../../../../../src/lib/actions/emoji/updateEmoji.js").default || require("../../../../../../src/lib/actions/emoji/updateEmoji.js");
const {UPDATE_EMOJI} = require("../../../../../../src/lib/actions/emoji/updateEmoji.js");

describe("updateEmoji", function () {
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

    describe("UPDATE_EMOJI", function () {
        it("is dispatched with the expected payload (updates emoji)", function () {
            stubStore.dispatch(updateEmoji(stubEmoji));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: UPDATE_EMOJI,
                payload: stubEmoji
            }]);
        });

        it("is dispatched with the expected payload (no emoji to update)", function () {
            stubStore.dispatch(updateEmoji(stubEmoji.set("id", "meow")));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(0);
            expect(actions).to.eql([]);
        });
    });
});
