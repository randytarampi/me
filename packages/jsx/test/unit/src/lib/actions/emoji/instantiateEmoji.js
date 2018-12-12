import {Emoji} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import instantiateEmoji, {INSTANTIATE_EMOJI} from "../../../../../../src/lib/actions/emoji/instantiateEmoji";

describe("instantiateEmoji", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubEmoji;

    beforeEach(function () {
        stubMiddleware = [thunk];
        stubEmoji = Emoji.fromJS({id: "woof"});
        stubInitialState = Map({
            emoji: Map({})
        });
        mockStore = configureStore(stubMiddleware);
        stubStore = mockStore(stubInitialState);
    });

    describe("INSTANTIATE_EMOJI", function () {
        it("is dispatched with the expected payload (instantiates emoji)", function () {
            stubStore.dispatch(instantiateEmoji(stubEmoji));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: INSTANTIATE_EMOJI,
                payload: stubEmoji
            }]);
        });

        it("is dispatched with the expected payload (doesn't instantiate emoji if it already exists)", function () {
            stubInitialState = Map({
                emoji: Map({
                    [stubEmoji.id]: stubEmoji
                })
            });
            stubStore = mockStore(stubInitialState);

            stubStore.dispatch(instantiateEmoji(stubEmoji));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(0);
            expect(actions).to.eql([]);
        });
    });
});
