import {expect} from "chai";
import {LOCATION_CHANGE} from "connected-react-router/immutable";
import sinon from "sinon";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../../../../../src/lib/actions/routing";
import selectors from "../../../../../src/lib/data/selectors";
import ui from "../../../../../src/lib/middleware/ui";

describe("ui", function () {
    const originalM = window.M;
    const originalDocumentBodyInnerHtml = window.document.body.innerHTML;
    let stubGetInstance;
    let stubSelect;
    let stubStore;
    let stubNext;
    let stubMTabs;
    let stubM;

    beforeEach(function () {
        stubSelect = sinon.stub();
        stubStore = {
            dispatch: sinon.stub(),
            getState: sinon.stub()
        };
        stubNext = sinon.stub();
        stubMTabs = {
            select: stubSelect,
            $tabLinks: [
                null,
                {
                    hash: "#tab_01"
                }
            ]
        };
        stubGetInstance = sinon.stub().returns(stubMTabs);
        stubM = {
            Tabs: {
                getInstance: stubGetInstance,
            }
        };

        window.M = stubM;
        window.document.body.innerHTML = "<html><div id=\"react-root\"><div class=\"nav-tabs__swipeable\"></div></div></html>";
        sinon.stub(selectors, "getIndexForRoute").returns(1);
    });

    afterEach(function () {
        window.M = originalM;
        window.document.body.innerHTML = originalDocumentBodyInnerHtml;

        selectors.getIndexForRoute.restore();
    });

    it("swipes tabs on `LOCATION_CHANGE` if we have tabs to swipe", function () {
        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.getState.calledOnce).to.eql(true);
        expect(stubGetInstance.calledOnce).to.eql(true);
        expect(stubSelect.calledOnce).to.eql(true);
    });

    it("doesn't swipe tabs on `LOCATION_CHANGE` if there are no tabs to swipe", function () {
        window.M = null;

        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.getState.notCalled).to.eql(true);
        expect(stubGetInstance.notCalled).to.eql(true);
        expect(stubSelect.notCalled).to.eql(true);
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
        expect(stubGetInstance.notCalled).to.eql(true);
    });
});
