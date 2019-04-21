import {expect} from "chai";
import {LOCATION_CHANGE} from "connected-react-router/immutable";
import proxyquire from "proxyquire";
import sinon from "sinon";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../../../../../src/lib/actions/routing";
import selectors from "../../../../../src/lib/data/selectors";

describe("ui", function () {
    let stubGetInstance;
    let stubUpdateTabIndicator;
    let stubStore;
    let stubNext;
    let stubMTabs;
    let stubM;

    beforeEach(function () {
        stubUpdateTabIndicator = sinon.stub();
        stubStore = {
            dispatch: sinon.stub(),
            getState: sinon.stub()
        };
        stubNext = sinon.stub();
        stubMTabs = {
            updateTabIndicator: stubUpdateTabIndicator
        };
        stubGetInstance = sinon.stub().returns(stubMTabs);
        stubM = {
            Tabs: {
                getInstance: stubGetInstance
            }
        };

        sinon.stub(selectors, "getIndexForRoute").returns("woof");
    });

    afterEach(function () {
        selectors.getIndexForRoute.restore();
    });

    xit("swipes tabs on `LOCATION_CHANGE` if we have tabs to swipe", function () {
        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };
        const ui = proxyquire("../../../../../src/lib/middleware/ui", {
            "materialize-css": stubM
        }).default;

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.getState.calledOnce).to.eql(true);
        expect(stubGetInstance.calledOnce).to.eql(true);
        expect(stubUpdateTabIndicator.calledOnce).to.eql(true);
    });

    xit("doesn't swipe tabs on `LOCATION_CHANGE` if there are no tabs to swipe", function () {
        stubGetInstance = sinon.stub();
        stubM = sinon.stub().returns({
            getInstance: stubGetInstance
        });

        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };
        const ui = proxyquire("../../../../../src/lib/middleware/ui", {
            "materialize-css": stubM
        }).default;

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.getState.notCalled).to.eql(true);
        expect(stubGetInstance.calledOnce).to.eql(true);
        expect(stubUpdateTabIndicator.notCalled).to.eql(true);
    });

    it("dispatches `clearError` on `SWIPEABLE_CHANGE_INDEX`", function () {
        const stubStore = {
            dispatch: sinon.stub()
        };
        const stubNext = sinon.stub();
        const stubAction = {
            type: SWIPEABLE_CHANGE_INDEX,
            payload: "grr"
        };
        const ui = proxyquire("../../../../../src/lib/middleware/ui", {
            "materialize-css": stubM
        }).default;

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.dispatch.calledOnce).to.eql(true);
    });

    it("dispatches `clearError` on `SWIPEABLE_TAB_CHANGE_INDEX`", function () {
        const stubStore = {
            dispatch: sinon.stub()
        };
        const stubNext = sinon.stub();
        const stubAction = {
            type: SWIPEABLE_TAB_CHANGE_INDEX,
            payload: "grr"
        };
        const ui = proxyquire("../../../../../src/lib/middleware/ui", {
            "materialize-css": stubM
        }).default;

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.dispatch.calledOnce).to.eql(true);
    });

    it("calls `next` on everything else", function () {
        const stubAction = {
            type: "woof",
            payload: "grr"
        };
        const ui = proxyquire("../../../../../src/lib/middleware/ui", {
            "materialize-css": stubM
        }).default;

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubGetInstance.notCalled).to.eql(true);
    });
});
