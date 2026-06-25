const {expect} = require("chai");
const {JSDOM} = require("jsdom");
const {LOCATION_CHANGE} = require("redux-first-history");
const sinon = require("sinon");
const {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} = require("../../../../../src/lib/actions/routing/index.js");
const selectors = require("../../../../../src/lib/data/selectors.js").default || require("../../../../../src/lib/data/selectors.js");
const ui = require("../../../../../src/lib/middleware/ui.js").default || require("../../../../../src/lib/middleware/ui.js");

describe("ui", function () {
    const globalWindow = global.window || new JSDOM("<html><div id=\"react-root\"></div></html>").window;
    const originalM = typeof globalWindow.M !== "undefined" && globalWindow.M;
    const originalDocumentBodyInnerHtml = globalWindow.document.body.innerHTML;

    if (!global.window) {
        global.window = globalWindow;
        global.document = globalWindow.document;
    }
    let stubGetInstance;
    let stubSelect;
    let stubStore;
    let stubNext;
    let stubMTabs;
    let stubM;

    beforeEach(function () {
        const jsdomWindow = globalWindow;

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

        jsdomWindow.M = stubM;
        jsdomWindow.document.body.innerHTML = "<html><div id=\"react-root\"><div class=\"nav-tabs__swipeable\"></div></div></html>";
        sinon.stub(selectors, "getIndexForRoute").returns(1);
    });

    afterEach(function () {
        const jsdomWindow = globalWindow;

        jsdomWindow.M = originalM;
        jsdomWindow.document.body.innerHTML = originalDocumentBodyInnerHtml;

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
        globalWindow.M = null;

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
