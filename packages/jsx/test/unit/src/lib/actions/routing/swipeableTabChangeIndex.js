import {expect} from "chai";
import {Map} from "immutable";
import proxyquire from "proxyquire";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {SWIPEABLE_TAB_CHANGE_INDEX} from "../../../../../../src/lib/actions/routing/swipeableTabChangeIndex";
import selectors from "../../../../../../src/lib/data/selectors";

// FIXME-RT: Unignore these tests when I figure out how to stub out `connectedReactRouter.push` properly
describe("swipeableTabChangeIndex", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubPush;
    let swipeableTabChangeIndex;

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

        swipeableTabChangeIndex = proxyquire("../../../../../../src/lib/actions/routing/swipeableTabChangeIndex", {
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

    describe("SWIPEABLE_TAB_CHANGE_INDEX", function () {
        it("is dispatched with the expected payload (actual route)", function () {
            const stubPayload = "05";
            stubStore.dispatch(swipeableTabChangeIndex(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(2);
            expect(actions).to.eql([
                {
                    type: SWIPEABLE_TAB_CHANGE_INDEX,
                    payload: {
                        index: Number(stubPayload)
                    }
                },
                {
                    type: "woof",
                    payload: {
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

            const stubPayload = "15";
            stubStore.dispatch(swipeableTabChangeIndex(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([
                {
                    type: SWIPEABLE_TAB_CHANGE_INDEX,
                    payload: {
                        index: 5
                    }
                }
            ]);
            expect(stubPush.notCalled).to.eql(true);
            expect(selectors.getRouteForIndex.calledOnce).to.eql(true);
        });
    });
});
