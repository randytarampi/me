const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const sinon = require("sinon");
const swipeableTabChangeIndex = require("../../../../../../src/lib/actions/routing/swipeableTabChangeIndex.js").default || require("../../../../../../src/lib/actions/routing/swipeableTabChangeIndex.js");
const {SWIPEABLE_TAB_CHANGE_INDEX} = require("../../../../../../src/lib/actions/routing/swipeableTabChangeIndex.js");
const selectors = require("../../../../../../src/lib/data/selectors.js").default || require("../../../../../../src/lib/data/selectors.js");

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
        sinon.stub(selectors, "getRouteForIndex").callsFake((state, index) => ({path: `/meow/:${index}`}));
    });

    afterEach(function () {
        selectors.getRouteForIndex.restore();
    });

    describe("SWIPEABLE_TAB_CHANGE_INDEX", function () {
        it("is dispatched with the expected payload (actual route)", function () {
            const stubIndex = "5";
            const stubId = `0${stubIndex}`;
            const stubPayload = {currentTarget: {getAttribute: argument => argument === "href" && `tab_${stubId}`}};
            stubStore.dispatch(swipeableTabChangeIndex(stubPayload));

            expect(stubStore.getActions()).to.eql([
                {
                    type: SWIPEABLE_TAB_CHANGE_INDEX,
                    payload: {
                        index: Number(stubIndex)
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

            const stubPayload = {currentTarget: {getAttribute: argument => argument === "href" && "15"}};
            stubStore.dispatch(swipeableTabChangeIndex(stubPayload));

            expect(stubStore.getActions()).to.eql([
                {
                    type: SWIPEABLE_TAB_CHANGE_INDEX,
                    payload: {
                        index: 5
                    }
                }
            ]);
            expect(selectors.getRouteForIndex.calledOnce).to.eql(true);
        });
    });
});
