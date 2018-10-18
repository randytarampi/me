import {expect} from "chai";
import * as connectedReactRouter from "connected-react-router";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import swipeableTabChangeIndex, {SWIPEABLE_TAB_CHANGE_INDEX} from "../../../../../../src/lib/actions/routing/swipeableTabChangeIndex";
import selectors from "../../../../../../src/lib/data/selectors";

describe("swipeableTabChangeIndex", function () {
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

    describe("SWIPEABLE_TAB_CHANGE_INDEX", function () {
        it("is dispatched with the expected payload", function () {
            const stubPayload = "05";
            stubStore.dispatch(swipeableTabChangeIndex(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(2);
            expect(actions).to.eql([
                {
                    type: SWIPEABLE_TAB_CHANGE_INDEX,
                    payload: {
                        index: Number(stubPayload)
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
    });
});
