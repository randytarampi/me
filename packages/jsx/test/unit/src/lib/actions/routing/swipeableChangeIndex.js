import {expect} from "chai";
import {Map} from "immutable";
import proxyquire from "proxyquire";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {SWIPEABLE_CHANGE_INDEX} from "../../../../../../src/lib/actions/routing/swipeableChangeIndex";
import selectors from "../../../../../../src/lib/data/selectors";

describe("swipeableChangeIndex", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubPush;
    let swipeableChangeIndex;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({});
        stubStore = mockStore(stubInitialState);
        stubPush = sinon.stub().callsFake(payload => {
            return {
                payload,
                type: "woof"
            };
        });

        swipeableChangeIndex = proxyquire("../../../../../../src/lib/actions/routing/swipeableChangeIndex", {
            "connected-react-router/immutable": {
                push: stubPush
            }
        }).default;

        sinon.stub(selectors, "getRouteForIndex").callsFake((state, index) => {
            return {
                path: `/meow/:${index}`
            };
        });
    });

    afterEach(function () {
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
            expect(stubPush.calledOnce).to.eql(true);
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
            expect(stubPush.notCalled).to.eql(true);
            expect(selectors.getRouteForIndex.calledOnce).to.eql(true);
        });
    });
});
