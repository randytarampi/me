import {expect} from "chai";
import {LOCATION_CHANGE} from "connected-react-router";
import sinon from "sinon";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../../../../../src/lib/actions/routing";
import selectors from "../../../../../src/lib/data/selectors";
import ui from "../../../../../src/lib/middleware/ui";

describe("ui", function () {
    const original$ = global.$;
    let stubTabs;
    let stubStore;
    let stubNext;
    let stub$Tabs;
    let stub$;

    beforeEach(function () {
        stubTabs = sinon.stub();
        stubStore = {
            dispatch: sinon.stub(),
            getState: sinon.stub()
        };
        stubNext = sinon.stub();
        stub$Tabs = {
            length: 1,
            tabs: stubTabs
        };
        stub$ = sinon.stub().returns(stub$Tabs);
        global.$ = stub$;

        sinon.stub(selectors, "getIndexForRoute").returns("woof");
    });

    afterEach(function () {
        selectors.getIndexForRoute.restore();

        global.$ = original$;
    });

    it("swipes tabs on `LOCATION_CHANGE` if we have tabs to swipe", function () {
        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.getState.calledOnce).to.eql(true);
        expect(stub$.calledOnce).to.eql(true);
        expect(stubTabs.calledOnce).to.eql(true);
    });

    it("doesn't swipe tabs on `LOCATION_CHANGE` if there are no tabs to swipe", function () {
        stub$Tabs.tabs = null;

        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.getState.notCalled).to.eql(true);
        expect(stub$.calledOnce).to.eql(true);
        expect(stubTabs.notCalled).to.eql(true);
    });

    it("defers swipe tabs on `LOCATION_CHANGE` if there are no tabs to swipe", function () {
        stub$Tabs.length = 0;

        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.getState.calledOnce).to.eql(true);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(stub$.calledOnce).to.eql(true);
                    expect(stubTabs.calledOnce).to.eql(true);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }, 250);
        });
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

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.dispatch.calledOnce).to.eql(true);
    });

    it("calls `next` on everything else", function () {
        const stubAction = {
            type: "woof",
            payload: "grr"
        };

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stub$.notCalled).to.eql(true);
        expect(stubTabs.notCalled).to.eql(true);
    });
});
