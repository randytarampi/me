import {Emoji} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import updateEmoji, {UPDATE_EMOJI} from "../../../../../../src/lib/actions/emoji/updateEmoji";

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
