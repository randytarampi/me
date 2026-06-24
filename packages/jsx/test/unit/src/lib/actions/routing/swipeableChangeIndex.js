import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import sinon from "sinon";
import swipeableChangeIndex, {SWIPEABLE_CHANGE_INDEX} from "../../../../../../src/lib/actions/routing/swipeableChangeIndex";
import selectors from "../../../../../../src/lib/data/selectors";

describe("swipeableChangeIndex", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({});
        stubStore = mockStore(stubInitialState);
        sinon.stub(selectors, "getRouteForIndex").callsFake((state, index) => ({path: `/meow/:${index}`}));
    });

    afterEach(function () {
        selectors.getRouteForIndex.restore();
    });

    describe("SWIPEABLE_CHANGE_INDEX", function () {
        it("is dispatched with the expected payload (real route)", function () {
            const stubPayload = "woof";
            stubStore.dispatch(swipeableChangeIndex(stubPayload));

            expect(stubStore.getActions()).to.eql([
                {
                    type: SWIPEABLE_CHANGE_INDEX,
                    payload: {
                        index: stubPayload,
                        indexLatest: undefined,
                        meta: undefined
                    }
                },
                {
                    type: "@@router/CALL_HISTORY_METHOD",
                    payload: {
                        method: "push",
                        args: [{pathname: "/meow/"}]
                    }
                }
            ]);
            expect(selectors.getRouteForIndex.calledOnce).to.eql(true);
        });

        it("is dispatched with the expected payload (fake route)", function () {
            selectors.getRouteForIndex.restore();
            sinon.stub(selectors, "getRouteForIndex").callsFake(() => null);

            const stubPayload = "woof";
            stubStore.dispatch(swipeableChangeIndex(stubPayload));

            expect(stubStore.getActions()).to.eql([
                {
                    type: SWIPEABLE_CHANGE_INDEX,
                    payload: {
                        index: stubPayload,
                        indexLatest: undefined,
                        meta: undefined
                    }
                }
            ]);
            expect(selectors.getRouteForIndex.calledOnce).to.eql(true);
        });
    });
});
