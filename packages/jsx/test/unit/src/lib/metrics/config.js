import {expect} from "chai";
import sinon from "sinon";
import config, {gtmClient} from "../../../../../src/lib/metrics/config";
import * as util from "../../../../../src/lib/metrics/util";
import GtmClient from "../../../../../src/lib/metrics/vendors/gtm";

describe("config", function () {
    beforeEach(function () {
        sinon.stub(util, "buildEventDetails").returns({});
    });

    afterEach(function () {
        util.buildEventDetails.restore();
    });

    describe(".vendors", function () {
        it("has the expected vendors", function () {
            expect(config.vendors).to.be.ok;
            expect(config.vendors).to.eql([
                {api: gtmClient}
            ]);

            expect(gtmClient).to.be.instanceOf(GtmClient);
        });
    });

    describe(".pageDefaults", function () {
        it("calls `util.buildEventDetails` with the expected parameters", function () {
            const stubRouteState = {
                pathname: "woof",
                search: "grr",
                hash: "meow",
                params: "rawr"
            };

            const eventDetails = config.pageDefaults(stubRouteState);
            expect(eventDetails).to.be.ok;
            expect(util.buildEventDetails.calledOnce).to.eql(true);
            sinon.assert.calledWith(util.buildEventDetails, {
                value: stubRouteState.pathname,
                pathname: stubRouteState.pathname,
                search: stubRouteState.search,
                hash: stubRouteState.hash,
                params: stubRouteState.params
            });
        });
    });
});
