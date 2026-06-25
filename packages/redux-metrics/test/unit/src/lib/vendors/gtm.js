import {expect} from "chai";
import {JSDOM} from "jsdom";
import GtmClient from "../../../../../src/lib/vendors/gtm.js";

describe("GtmClient", function () {
    const globalWindow = global.window || new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"}).window;

    if (!global.window) {
        global.window = globalWindow;
        global.document = globalWindow.document;
    }

    afterEach(function () {
        global.window = globalWindow;
        global.document = globalWindow.document;
    });

    describe("constructor", function () {
        it("should build a `GtmClient` instance", function () {
            const gtmClient = new GtmClient();

            expect(gtmClient.name).to.eql("GTM");
            expect(gtmClient.options).to.eql({});
            expect(gtmClient.dataLayer).to.eql([]);
            expect(gtmClient).to.be.instanceOf(GtmClient);
        });

        it("should build a `GtmClient` instance, using `window.GTM_DATALAYER`", function () {
            const stubDataLayer = [{woof: "meow"}];
            const stubDom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            expect(gtmClient.name).to.eql("GTM");
            expect(gtmClient.options).to.eql({});
            expect(gtmClient.dataLayer).to.eql(stubDataLayer);
            expect(gtmClient).to.be.instanceOf(GtmClient);
        });
    });

    describe("track", function () {
        it("pushes the correct value into the dataLayer", function () {
            const stubEventName = "woof";
            const stubEventDetails = {
                woof: "1",
                grr: "a",
                rawr: {
                    "ʕ•ᴥ•ʔ": [1, 2, 3, 4]
                }
            };
            const stubDataLayer = [];
            const stubDom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            return gtmClient.track(stubEventName, stubEventDetails)
                .then(returnValue => {
                    expect(returnValue).to.eql(stubDataLayer.length);
                    expect(stubDataLayer).to.have.lengthOf(1);
                    expect(stubDataLayer[0].event).to.eql(stubEventName);
                });
        });
    });

    describe("pageView", function () {
        it("pushes the correct value into the dataLayer", function () {
            const stubEventName = "woof";
            const stubEventDetails = {
                woof: "1",
                grr: "a",
                rawr: {
                    "ʕ•ᴥ•ʔ": [1, 2, 3, 4]
                }
            };
            const stubDataLayer = [];
            const stubDom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            return gtmClient.pageView(stubEventName, stubEventDetails)
                .then(returnValue => {
                    expect(returnValue).to.eql(stubDataLayer.length);
                    expect(stubDataLayer).to.have.lengthOf(1);
                    expect(stubDataLayer[0].event).to.eql(stubEventName);
                });
        });
    });

    describe("trackReduxAction", function () {
        it("pushes the correct value into the dataLayer", function () {
            const stubAction = {
                type: "woof",
                payload: "rawr"
            };
            const stubEventDetails = {
                woof: "1",
                grr: "a",
                rawr: {
                    "ʕ•ᴥ•ʔ": [1, 2, 3, 4]
                }
            };
            const stubDataLayer = [];
            const stubDom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            return gtmClient.trackReduxAction(stubAction, stubEventDetails)
                .then(returnValue => {
                    expect(returnValue).to.eql(stubDataLayer.length);
                    expect(stubDataLayer).to.have.lengthOf(1);
                    expect(stubDataLayer[0].event).to.eql("action");
                });
        });

        it("pushes the correct value into the dataLayer (no event details)", function () {
            const stubAction = {
                type: "woof",
                payload: "rawr"
            };
            const stubDataLayer = [];
            const stubDom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            return gtmClient.trackReduxAction(stubAction)
                .then(returnValue => {
                    expect(returnValue).to.eql(stubDataLayer.length);
                    expect(stubDataLayer).to.have.lengthOf(1);
                    expect(stubDataLayer[0].event).to.eql("action");
                });
        });
    });
});