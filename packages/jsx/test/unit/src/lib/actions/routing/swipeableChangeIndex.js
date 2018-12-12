import {expect} from "chai";
import * as connectedReactRouter from "connected-react-router";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
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

        sinon.stub(connectedReactRouter, "push").callsFake(payload => {
            return {
                payload,
                type: "woof"
            };
        });
        sinon.stub(selectors, "getRouteForIndex").callsFake((state, index) => {
            return {
                path: `/meow/:${index}`
            };
        });
    });

    afterEach(function () {
        connectedReactRouter.push.restore();
        selectors.getRouteForIndex.restore();
    });

    describe("SWIPEABLE_CHANGE_INDEX", function () {
        it("is dispatched with the expected payload (real route)", function () {
            const stubPayload = "woof";
            stubStore.dispatch(swipeableChangeIndex(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(2);
            expect(actions).to.eql([
                {
                    type: SWIPEABLE_CHANGE_INDEX,
                    payload: {
                        index: stubPayload,
                        indexLatest: undefined,
                        meta: undefined
                    }
                },
                {
                    type: "woof", payload: {
                        pathname: "/meow/"
                    }
                }
            ]);
            expect(connectedReactRouter.push.calledOnce).to.eql(true);
            expect(selectors.getRouteForIndex.calledOnce).to.eql(true);
        });

        it("is dispatched with the expected payload (fake route)", function () {
            selectors.getRouteForIndex.restore();
            sinon.stub(selectors, "getRouteForIndex").callsFake(() => null);

            const stubPayload = "woof";
            stubStore.dispatch(swipeableChangeIndex(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([
                {
                    type: SWIPEABLE_CHANGE_INDEX,
                    payload: {
                        index: stubPayload,
                        indexLatest: undefined,
                        meta: undefined
                    }
                }
            ]);
            expect(connectedReactRouter.push.notCalled).to.eql(true);
            expect(selectors.getRouteForIndex.calledOnce).to.eql(true);
        });
    });
});
