import {Emoji} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import clearEmoji, {CLEAR_EMOJI} from "../../../../../src/lib/actions/emoji/clearEmoji";

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

            expect(actions).to.be.ok;
            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: CLEAR_EMOJI,
                payload: stubEmoji
            }]);
        });

        it("is dispatched with the expected payload (no emoji to clear)", function () {
            stubStore.dispatch(clearEmoji(stubEmoji.set("id", "meow")));

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(0);
            expect(actions).to.eql([]);
        });
    });
});
