import {expect} from "chai";
import {JSDOM} from "jsdom";
import sinon from "sinon";
import * as util from "../../../../../../src/lib/metrics/util";
import GtmClient from "../../../../../../src/lib/metrics/vendors/gtm";

describe("GtmClient", function () {
    const globalWindow = global.window;

    beforeEach(function () {
        sinon.stub(util, "buildEventDetails").returns({});
        sinon.stub(util, "buildReduxActionEventDetails").returns({});
    });

    afterEach(function () {
        util.buildEventDetails.restore();
        util.buildReduxActionEventDetails.restore();

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
            const stubDom = new JSDOM();
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

    describe("#track", function () {
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
            const stubDom = new JSDOM();
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            return gtmClient.track(stubEventName, stubEventDetails)
                .then(returnValue => {
                    expect(returnValue).to.eql(stubDataLayer.length);
                    expect(stubDataLayer).to.eql([{
                        event: stubEventName
                    }]);
                    expect(util.buildEventDetails.calledOnce).to.eql(true);
                    sinon.assert.calledWith(util.buildEventDetails, stubEventDetails);
                });
        });
    });

    describe("#pageView", function () {
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
            const stubDom = new JSDOM();
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            return gtmClient.pageView(stubEventName, stubEventDetails)
                .then(returnValue => {
                    expect(returnValue).to.eql(stubDataLayer.length);
                    expect(stubDataLayer).to.eql([{
                        event: stubEventName
                    }]);
                    expect(util.buildEventDetails.calledOnce).to.eql(true);
                    sinon.assert.calledWith(util.buildEventDetails, stubEventDetails);
                });
        });
    });

    describe("#trackReduxAction", function () {
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
            const stubDom = new JSDOM();
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.GTM_DATALAYER = stubDataLayer;

            const gtmClient = new GtmClient();

            return gtmClient.trackReduxAction(stubAction, stubEventDetails)
                .then(returnValue => {
                    expect(returnValue).to.eql(stubDataLayer.length);
                    expect(stubDataLayer).to.eql([{
                        event: "action"
                    }]);
                    expect(util.buildReduxActionEventDetails.calledOnce).to.eql(true);
                    sinon.assert.calledWith(util.buildReduxActionEventDetails, stubAction, stubEventDetails);
                });
        });
    });
});
