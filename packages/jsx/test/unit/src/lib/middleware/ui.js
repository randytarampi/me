import {createRequire} from "module";

const require = createRequire(import.meta.url);

const {expect} = require("chai");
const {JSDOM} = require("jsdom");
const {LOCATION_CHANGE} = require("redux-first-history");
const sinon = require("sinon");
const {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX, SWIPEABLE_TABS_READY} = require("../../../../../src/lib/actions/routing/index.js");
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
    let stubState;

    beforeEach(function () {
        const jsdomWindow = globalWindow;

        stubSelect = sinon.stub();
        stubState = {
            get: sinon.stub().withArgs("router").returns({location: {pathname: "/"}})
        };
        stubStore = {
            dispatch: sinon.stub(),
            getState: sinon.stub().returns(stubState)
        };
        stubNext = sinon.stub();
        stubMTabs = {
            select: stubSelect,
            $tabLinks: [
                null,
                {
                    hash: "#tab_01",
                    setAttribute: sinon.stub()
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
        sinon.stub(selectors, "getIndexForRoute").callsFake((state, pathname) => {
            expect(state).to.equal(stubState);
            return pathname === "/missing" ? -1 : 1;
        });
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
        expect(stubGetInstance.calledTwice).to.eql(true);
        expect(stubSelect.calledOnce).to.eql(true);
        expect(stubMTabs.$tabLinks[1].setAttribute.calledWith("role", "tab")).to.eql(true);
        expect(stubMTabs.$tabLinks[1].setAttribute.calledWith("aria-selected", "true")).to.eql(true);
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

    it("doesn't crash when the route has no corresponding tab", function () {
        const remove = sinon.stub();
        stubMTabs.$tabLinks = [{classList: {remove}, parentElement: {classList: {remove}}}];
        stubState.get.withArgs("router").returns({location: {pathname: "/missing"}});

        ui(stubStore)(stubNext)({
            type: LOCATION_CHANGE,
            payload: {location: {pathname: "/missing"}}
        });

        expect(stubNext.calledOnce).to.eql(true);
        expect(stubSelect.notCalled).to.eql(true);
        expect(remove.calledWith("active")).to.eql(true);
    });

    it("handles Materialize's array-like tab link collection", function () {
        const remove = sinon.stub();
        const tabLink = {classList: {remove}, parentElement: {classList: {remove}}};
        stubMTabs.$tabLinks = {0: tabLink, length: 1};
        stubState.get.withArgs("router").returns({location: {pathname: "/missing"}});

        ui(stubStore)(stubNext)({
            type: LOCATION_CHANGE,
            payload: {location: {pathname: "/missing"}}
        });

        expect(stubNext.calledOnce).to.eql(true);
        expect(remove.calledWith("active")).to.eql(true);
    });

    it("syncs an unknown direct route when the Materialize instance appears later", function () {
        globalWindow.M = null;
        const originalLocation = globalThis.location;
        Object.defineProperty(globalThis, "location", {configurable: true, value: {pathname: "/missing"}});
        const remove = sinon.stub();
        const tabLinks = [0, 1].map(index => ({
            hash: `#tab_0${index}`,
            classList: {remove},
            parentElement: {classList: {remove}},
            setAttribute: sinon.stub()
        }));
        stubMTabs.$tabLinks = tabLinks;

        ui(stubStore)(stubNext)({type: LOCATION_CHANGE, payload: {location: {pathname: "/missing"}}});
        expect(stubSelect.notCalled).to.eql(true);

        globalWindow.M = stubM;
        ui(stubStore)(stubNext)({type: "REHYDRATE_COMPLETE"});

        expect(stubSelect.notCalled).to.eql(true);
        expect(remove.calledWith("active")).to.eql(true);
        expect(tabLinks.every(tabLink => tabLink.setAttribute.calledWith("aria-selected", "false"))).to.eql(true);
        expect(stubNext.calledTwice).to.eql(true);
        Object.defineProperty(globalThis, "location", {configurable: true, value: originalLocation});
    });

    it("selects a known route when the Materialize instance appears later", function () {
        globalWindow.M = null;

        ui(stubStore)(stubNext)({type: LOCATION_CHANGE, payload: {location: {pathname: "/"}}});
        expect(stubSelect.notCalled).to.eql(true);

        globalWindow.M = stubM;
        ui(stubStore)(stubNext)({type: "REHYDRATE_COMPLETE"});

        expect(stubSelect.calledOnceWithExactly("tab_01")).to.eql(true);
        expect(stubMTabs.$tabLinks[1].setAttribute.calledWith("aria-selected", "true")).to.eql(true);
    });

    it("syncs the route when the tabs instance reports ready", function () {
        globalWindow.M = stubM;

        ui(stubStore)(stubNext)({type: SWIPEABLE_TABS_READY});

        expect(stubSelect.calledOnceWithExactly("tab_01")).to.eql(true);
        expect(stubNext.calledOnce).to.eql(true);
    });

    it("dispatches `clearError` on `SWIPEABLE_CHANGE_INDEX`", function () {
        globalWindow.M = null;
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
        globalWindow.M = null;
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
        globalWindow.M = null;
        const stubAction = {
            type: "woof",
            payload: "grr"
        };

        ui(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubGetInstance.notCalled).to.eql(true);
    });
});
